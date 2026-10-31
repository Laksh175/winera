import Blog from '../models/Blog.js';
import Project from '../models/Project.js';
import Content from '../models/Content.js';
import { clearContentCache } from '../controllers/content.controller.js';
import { addOrUpdateUrlInSitemap } from '../utils/sitemapService.js';

/**
 * Checks for any scheduled blogs or projects whose target date/time has arrived,
 * and automatically promotes them to active/published status without any manual admin action.
 */
export const checkAndPublishScheduledItems = async () => {
  try {
    const now = new Date();

    // 1. Process Due Scheduled Blogs
    const dueBlogs = await Blog.find({
      status: 'scheduled',
      scheduledAt: { $ne: null, $lte: now }
    });

    if (dueBlogs.length > 0) {
      for (const blog of dueBlogs) {
        blog.status = 'active';
        blog.isActive = true;
        blog.isPublished = true;
        await blog.save();

        console.log(`⏰ [Auto-Publisher] Successfully published scheduled Blog: "${blog.title}" (${blog.slug})`);

        // Sync to Content model blogPosts
        try {
          const contentDoc = await Content.findOne({ sectionKey: 'blogPosts' });
          if (contentDoc && Array.isArray(contentDoc.data)) {
            const idx = contentDoc.data.findIndex(p =>
              String(p._id) === String(blog._id) ||
              String(p.id) === String(blog.id) ||
              p.slug === blog.slug
            );
            if (idx !== -1) {
              contentDoc.data[idx] = blog.toObject();
            } else {
              contentDoc.data.unshift(blog.toObject());
            }
            contentDoc.markModified('data');
            await contentDoc.save();
          }
        } catch (syncErr) {
          console.warn('[Auto-Publisher] Blog sync notice:', syncErr.message);
        }

        // Add to Sitemap
        if (blog.slug) {
          addOrUpdateUrlInSitemap({
            url: `https://winera.in/blog/${blog.slug}`,
            priority: '0.8',
            changefreq: 'weekly'
          }).catch(e => console.warn('[Auto-Publisher] Sitemap notice on blog publish:', e.message));
        }
      }
      clearContentCache();
    }

    // 2. Process Due Scheduled Projects
    const dueProjects = await Project.find({
      status: 'scheduled',
      scheduledAt: { $ne: null, $lte: now }
    });

    if (dueProjects.length > 0) {
      for (const project of dueProjects) {
        project.status = 'active';
        project.isActive = true;
        await project.save();

        console.log(`⏰ [Auto-Publisher] Successfully published scheduled Project: "${project.name}" (${project.slug})`);

        // Sync to Content model projectItems
        try {
          const contentDoc = await Content.findOne({ sectionKey: 'projectItems' });
          if (contentDoc && Array.isArray(contentDoc.data)) {
            const idx = contentDoc.data.findIndex(p =>
              String(p._id) === String(project._id) ||
              String(p.id) === String(project.id) ||
              p.slug === project.slug
            );
            if (idx !== -1) {
              contentDoc.data[idx] = project.toObject();
            } else {
              contentDoc.data.unshift(project.toObject());
            }
            contentDoc.markModified('data');
            await contentDoc.save();
          }
        } catch (syncErr) {
          console.warn('[Auto-Publisher] Project sync notice:', syncErr.message);
        }

        // Sync to builtProjects if present
        try {
          const builtDoc = await Content.findOne({ sectionKey: 'builtProjects' });
          if (builtDoc && Array.isArray(builtDoc.data)) {
            const bIdx = builtDoc.data.findIndex(b =>
              (b.slug && project.slug && b.slug === project.slug) ||
              (b.name && project.name && b.name.toLowerCase() === project.name.toLowerCase())
            );
            if (bIdx !== -1) {
              builtDoc.data[bIdx].status = 'active';
              builtDoc.data[bIdx].isActive = true;
              builtDoc.markModified('data');
              await builtDoc.save();
            }
          }
        } catch (builtErr) {
          console.warn('[Auto-Publisher] builtProjects sync notice:', builtErr.message);
        }

        // Add to Sitemap
        if (project.slug) {
          addOrUpdateUrlInSitemap({
            url: `https://winera.in/project/${project.slug}`,
            priority: '0.8',
            changefreq: 'weekly'
          }).catch(e => console.warn('[Auto-Publisher] Sitemap notice on project publish:', e.message));
        }
      }
      clearContentCache();
    }

    // 3. Direct scan of Content collection for projectItems
    try {
      const contentProjDoc = await Content.findOne({ sectionKey: 'projectItems' });
      if (contentProjDoc && Array.isArray(contentProjDoc.data)) {
        let modified = false;
        for (const p of contentProjDoc.data) {
          if (p.status === 'scheduled' && p.scheduledAt && new Date(p.scheduledAt) <= now) {
            p.status = 'active';
            p.isActive = true;
            modified = true;
            console.log(`⏰ [Auto-Publisher] Published due scheduled project in projectItems: "${p.name || p.slug}"`);
            try {
              const projDoc = await Project.findOne({ $or: [{ slug: p.slug }, { id: p.id }] });
              if (projDoc) {
                projDoc.status = 'active';
                projDoc.isActive = true;
                await projDoc.save();
              }
            } catch (err) {}
          }
        }
        if (modified) {
          contentProjDoc.markModified('data');
          await contentProjDoc.save();
          clearContentCache();
        }
      }
    } catch (e) {
      console.warn('[Auto-Publisher] Content projectItems direct scan notice:', e.message);
    }

    // 4. Direct scan of Content collection for blogPosts
    try {
      const contentBlogDoc = await Content.findOne({ sectionKey: 'blogPosts' });
      if (contentBlogDoc && Array.isArray(contentBlogDoc.data)) {
        let modified = false;
        for (const b of contentBlogDoc.data) {
          if (b.status === 'scheduled' && b.scheduledAt && new Date(b.scheduledAt) <= now) {
            b.status = 'active';
            b.isActive = true;
            b.isPublished = true;
            modified = true;
            console.log(`⏰ [Auto-Publisher] Published due scheduled blog in blogPosts: "${b.title || b.slug}"`);
            try {
              const blogDoc = await Blog.findOne({ $or: [{ slug: b.slug }, { id: b.id }] });
              if (blogDoc) {
                blogDoc.status = 'active';
                blogDoc.isActive = true;
                blogDoc.isPublished = true;
                await blogDoc.save();
              }
            } catch (err) {}
          }
        }
        if (modified) {
          contentBlogDoc.markModified('data');
          await contentBlogDoc.save();
          clearContentCache();
        }
      }
    } catch (e) {
      console.warn('[Auto-Publisher] Content blogPosts direct scan notice:', e.message);
    }
  } catch (error) {
    console.error('Error in checkAndPublishScheduledItems:', error);
  }
};

/**
 * Initializes the background scheduler (runs check every 60 seconds)
 */
export const initScheduledPublishingCron = () => {
  // Run once immediately on startup
  setTimeout(() => {
    checkAndPublishScheduledItems().catch(() => {});
  }, 5000);

  // Then run every 60 seconds
  setInterval(() => {
    checkAndPublishScheduledItems().catch(() => {});
  }, 60 * 1000);

  console.log('⏰ [Auto-Publisher] Scheduled publishing monitor initialized (checks every 60s)');
};
