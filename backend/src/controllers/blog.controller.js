import Blog from '../models/Blog.js';

// @desc    Get all blog posts with category filter, search & pagination
// @route   GET /api/blogs
export const getBlogs = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
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

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ id: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      blogs
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

    res.json({ success: true, blog });
  } catch (error) {
    console.error('Error fetching single blog post:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
