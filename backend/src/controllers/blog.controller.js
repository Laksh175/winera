import Blog from '../models/Blog.js';
import Content from '../models/Content.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { addOrUpdateUrlInSitemap, syncAllDatabaseToSitemap } from '../utils/sitemapService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let isSeedingBlogs = false;

// Auto-seed Blog collection from backup JSON if database collection is empty
export const ensureBlogsSeeded = async () => {
  try {
    const count = await Blog.countDocuments();
    if (count === 0 && !isSeedingBlogs) {
      isSeedingBlogs = true;
      const backupPath = path.join(__dirname, '../data/blogsData.json');
      if (fs.existsSync(backupPath)) {
        console.log('🔄 Auto-seeding Blog collection in MongoDB from backup JSON...');
        const raw = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
        const blogs = Array.isArray(raw) ? raw : (raw.blogs || raw.posts || []);
        if (blogs.length > 0) {
          await Blog.insertMany(blogs, { ordered: false });
          console.log(`✅ Auto-seeded ${blogs.length} blogs into MongoDB Blog collection!`);

          // Also update Content collection blogPosts section
          await Content.findOneAndUpdate(
            { sectionKey: 'blogPosts' },
            { sectionKey: 'blogPosts', data: blogs },
            { upsert: true, new: true }
          );
        }
      }
    }
  } catch (err) {
    console.warn('Auto-seed blogs notice:', err?.message);
  } finally {
    isSeedingBlogs = false;
  }
};

// @desc    Get all blog posts with category filter, search & pagination (supports limit=all)
// @route   GET /api/blogs
export const getBlogs = async (req, res) => {
  try {
    await ensureBlogsSeeded();

    const { category, search, page = 1, limit } = req.query;
    const query = { isPublished: { $ne: false } };

    if (category && category !== 'All' && category !== 'All Categories') {
      query.category = { $regex: new RegExp(category, 'i') };
    }

    if (search && search.trim() !== '') {
      const q = search.trim();
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { subtitle: { $regex: q, $options: 'i' } },
        { excerpt: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ];
    }

    const total = await Blog.countDocuments(query);

    // Support limit='all' or unlimited fetching like arcade-products & vr-games
    if (!limit || limit === 'all' || limit === 'All' || limit === '0' || parseInt(limit, 10) >= 1000) {
      const blogs = await Blog.find(query).sort({ id: 1, createdAt: -1 });
      return res.json({
        success: true,
        total,
        page: 1,
        totalPages: 1,
        blogs,
        posts: blogs
      });
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const blogs = await Blog.find(query)
      .sort({ id: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      blogs,
      posts: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, message: 'Server error fetching blogs' });
  }
};

// @desc    Get single blog post by slug or ID
// @route   GET /api/blogs/:slug
export const getBlogBySlug = async (req, res) => {
  try {
    await ensureBlogsSeeded();

    const { slug } = req.params;
    const isNum = !isNaN(Number(slug));

    const blog = await Blog.findOne({
      $or: [
        { slug },
        ...(isNum ? [{ id: Number(slug) }] : []),
        { title: { $regex: new RegExp(`^${slug.replace(/-/g, ' ')}$`, 'i') } }
      ]
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.json({ success: true, blog, post: blog });
  } catch (error) {
    console.error('Error fetching single blog post:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create new blog post
// @route   POST /api/admin/blogs
export const createBlog = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.slug) {
      data.slug = (data.title || `blog-${Date.now()}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    if (!data.id) {
      const highestId = await Blog.findOne().sort({ id: -1 }).select('id');
      data.id = (highestId?.id || 0) + 1;
    }

    const created = await Blog.create(data);

    // Sync to Content model blogPosts
    try {
      const contentDoc = await Content.findOne({ sectionKey: 'blogPosts' });
      if (contentDoc && Array.isArray(contentDoc.data)) {
        contentDoc.data = [created.toObject(), ...contentDoc.data];
        contentDoc.markModified('data');
        await contentDoc.save();
      }
    } catch (syncErr) {
      console.warn('Content model sync warning on blog create:', syncErr.message);
    }

    // Auto-update sitemap with new blog
    if (created.slug) {
      addOrUpdateUrlInSitemap({
        url: `https://winera.in/blog/${created.slug}`,
        priority: '0.8',
        changefreq: 'weekly'
      }).catch(e => console.warn('Sitemap auto-update notice on blog create:', e.message));
    }

    res.json({ success: true, blog: created, post: created });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update blog post
// @route   PUT /api/admin/blogs/:id
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    const isNum = !isNaN(Number(id));

    let updated = await Blog.findOneAndUpdate(
      {
        $or: [
          ...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : []),
          { slug: id },
          ...(isNum ? [{ id: Number(id) }] : [])
        ]
      },
      { $set: data },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Blog post not found to update' });
    }

    // Sync to Content model blogPosts
    try {
      const contentDoc = await Content.findOne({ sectionKey: 'blogPosts' });
      if (contentDoc && Array.isArray(contentDoc.data)) {
        const idx = contentDoc.data.findIndex(p =>
          String(p._id) === String(updated._id) ||
          String(p.id) === String(updated.id) ||
          p.slug === updated.slug
        );
        if (idx !== -1) {
          contentDoc.data[idx] = updated.toObject();
        } else {
          contentDoc.data.push(updated.toObject());
        }
        contentDoc.markModified('data');
        await contentDoc.save();
      }
    } catch (syncErr) {
      console.warn('Content model sync warning on blog update:', syncErr.message);
    }

    // Auto-update sitemap with updated blog
    if (updated.slug) {
      addOrUpdateUrlInSitemap({
        url: `https://winera.in/blog/${updated.slug}`,
        priority: '0.8',
        changefreq: 'weekly'
      }).catch(e => console.warn('Sitemap auto-update notice on blog update:', e.message));
    }

    res.json({ success: true, blog: updated, post: updated });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/admin/blogs/:id
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const isNum = !isNaN(Number(id));

    const deleted = await Blog.findOneAndDelete({
      $or: [
        ...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : []),
        { slug: id },
        ...(isNum ? [{ id: Number(id) }] : [])
      ]
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Blog post not found to delete' });
    }

    // Sync to Content model blogPosts
    try {
      const contentDoc = await Content.findOne({ sectionKey: 'blogPosts' });
      if (contentDoc && Array.isArray(contentDoc.data)) {
        contentDoc.data = contentDoc.data.filter(p =>
          String(p._id) !== String(deleted._id) &&
          String(p.id) !== String(deleted.id) &&
          p.slug !== deleted.slug
        );
        contentDoc.markModified('data');
        await contentDoc.save();
      }
    } catch (syncErr) {
      console.warn('Content model sync warning on blog delete:', syncErr.message);
    }

    // Resync sitemap
    syncAllDatabaseToSitemap().catch(e => console.warn('Sitemap notice on blog delete:', e.message));

    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
