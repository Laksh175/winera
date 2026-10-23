import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Project from '../models/Project.js';
import Content from '../models/Content.js';
import { addOrUpdateUrlInSitemap, syncAllDatabaseToSitemap } from '../utils/sitemapService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let isSeedingProjects = false;

// Auto-seed Project collection from backup JSON if database collection is empty
export const ensureProjectsSeeded = async () => {
  try {
    const count = await Project.countDocuments();
    if (count === 0 && !isSeedingProjects) {
      isSeedingProjects = true;
      const backupPath = path.join(__dirname, '../data/projectsData.json');
      if (fs.existsSync(backupPath)) {
        console.log('🔄 Auto-seeding Project collection in MongoDB from backup JSON...');
        const raw = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
        const projects = Array.isArray(raw) ? raw : (raw.projects || []);
        if (projects.length > 0) {
          await Project.insertMany(projects, { ordered: false });
          console.log(`✅ Auto-seeded ${projects.length} projects into MongoDB Project collection!`);

          // Also update Content collection projectItems and builtProjects section
          await Content.findOneAndUpdate(
            { sectionKey: 'projectItems' },
            { sectionKey: 'projectItems', data: projects },
            { upsert: true, new: true }
          );
        }
      }
    }
  } catch (err) {
    console.warn('Auto-seed projects notice:', err?.message);
  } finally {
    isSeedingProjects = false;
  }
};

// @desc    Get all active projects with category filter, search & pagination
// @route   GET /api/projects
export const getProjects = async (req, res) => {
  try {
    await ensureProjectsSeeded();

    // 1. Purge legacy dummy projects (Funfair & Skidz Play Spaces)
    try {
      await Project.deleteMany({
        $or: [
          { slug: { $in: ['funfair', 'skidz-play-spaces'] } },
          { name: { $regex: /^(funfair|skidz\s*play\s*spaces)$/i } }
        ]
      });
    } catch (purgeErr) {
      console.warn('Purge legacy projects warning:', purgeErr?.message);
    }

    // 2. Automatically synchronize Project collection with Content.projectItems (Admin source of truth)
    try {
      const contentDoc = await Content.findOne({ sectionKey: 'projectItems' });
      if (Array.isArray(contentDoc?.data) && contentDoc.data.length > 0) {
        const validItems = contentDoc.data.filter(p => {
          if (!p) return false;
          const s = (p.slug || '').toLowerCase();
          const n = (p.name || '').toLowerCase();
          return s !== 'funfair' && n !== 'funfair' && s !== 'skidz-play-spaces' && n !== 'skidz play spaces';
        });

        const validSlugs = validItems
          .map(p => p.slug || (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
          .filter(Boolean);

        // Only remove obsolete dummy projects (Funfair & Skidz Play Spaces)
        await Project.deleteMany({
          $or: [
            { slug: { $in: ['funfair', 'skidz-play-spaces'] } },
            { name: { $regex: /^(funfair|skidz\s*play\s*spaces)$/i } }
          ]
        }).catch(() => {});

        // Upsert items from Content.projectItems to Project collection
        for (const item of validItems) {
          const itemSlug = item.slug || (item.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          if (!itemSlug) continue;
          await Project.findOneAndUpdate(
            { $or: [{ slug: itemSlug }, { id: item.id || itemSlug }] },
            { $set: { ...item, slug: itemSlug, id: item.id || itemSlug } },
            { upsert: true }
          );
        }
      }
    } catch (syncErr) {
      console.warn('Sync Project with Content model notice:', syncErr?.message);
    }

    const { category, search } = req.query;
    const query = { isActive: { $ne: false }, status: { $ne: 'inactive' } };

    if (category && category !== 'All' && category !== 'All Categories') {
      query.category = { $regex: new RegExp(category, 'i') };
    }

    if (search && search.trim() !== '') {
      const q = search.trim();
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { city: { $regex: q, $options: 'i' } },
        { state: { $regex: q, $options: 'i' } },
        { type: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    let projects = await Project.find(query).sort({ createdAt: 1 });

    if (!projects || projects.length === 0) {
      const contentDoc = await Content.findOne({ sectionKey: 'projectItems' });
      if (Array.isArray(contentDoc?.data) && contentDoc.data.length > 0) {
        return res.json(contentDoc.data);
      }
    }

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single project by slug or ID
// @route   GET /api/projects/:slug
export const getProjectBySlug = async (req, res) => {
  try {
    await ensureProjectsSeeded();

    const { slug } = req.params;
    let project = await Project.findOne({
      $or: [
        { slug },
        { id: slug },
        { name: { $regex: new RegExp(`^${slug.replace(/-/g, ' ')}$`, 'i') } }
      ]
    });

    if (!project) {
      const contentDoc = await Content.findOne({ sectionKey: 'projectItems' });
      if (Array.isArray(contentDoc?.data)) {
        project = contentDoc.data.find(p => p.slug === slug || p.id === slug || p.name?.toLowerCase() === slug.replace(/-/g, ' ').toLowerCase());
      }
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new project
// @route   POST /api/admin/projects
export const createProject = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.slug) {
      data.slug = (data.name || `project-${Date.now()}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    if (!data.id) {
      data.id = data.slug;
    }

    const created = await Project.create(data);

    // Sync to Content model projectItems
    try {
      const contentDoc = await Content.findOne({ sectionKey: 'projectItems' });
      if (contentDoc && Array.isArray(contentDoc.data)) {
        contentDoc.data = [created.toObject(), ...contentDoc.data];
        contentDoc.markModified('data');
        await contentDoc.save();
      }
    } catch (syncErr) {
      console.warn('Content model sync warning on project create:', syncErr.message);
    }

    // Auto-update sitemap with new project
    if (created.slug) {
      addOrUpdateUrlInSitemap({
        url: `https://winera.in/project/${created.slug}`,
        priority: '0.8',
        changefreq: 'weekly'
      }).catch(e => console.warn('Sitemap auto-update notice on project create:', e.message));
    }

    res.json({ success: true, project: created });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/admin/projects/:id
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    let updated = await Project.findOneAndUpdate(
      {
        $or: [
          ...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : []),
          { slug: id },
          { id }
        ]
      },
      { $set: data },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found to update' });
    }

    // Sync to Content model projectItems
    try {
      const contentDoc = await Content.findOne({ sectionKey: 'projectItems' });
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
      console.warn('Content model sync warning on project update:', syncErr.message);
    }

    // Auto-update sitemap with updated project
    if (updated.slug) {
      addOrUpdateUrlInSitemap({
        url: `https://winera.in/project/${updated.slug}`,
        priority: '0.8',
        changefreq: 'weekly'
      }).catch(e => console.warn('Sitemap auto-update notice on project update:', e.message));
    }

    res.json({ success: true, project: updated });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/admin/projects/:id
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Project.findOneAndDelete({
      $or: [
        ...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : []),
        { slug: id },
        { id }
      ]
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project not found to delete' });
    }

    // Sync to Content model projectItems
    try {
      const contentDoc = await Content.findOne({ sectionKey: 'projectItems' });
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
      console.warn('Content model sync warning on project delete:', syncErr.message);
    }

    // Resync sitemap
    syncAllDatabaseToSitemap().catch(e => console.warn('Sitemap notice on project delete:', e.message));

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
