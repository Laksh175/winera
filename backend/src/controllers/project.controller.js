import Project from '../models/Project.js';
import Content from '../models/Content.js';
import projectsData from '../data/projectsData.json' with { type: 'json' };

export const getProjects = async (req, res) => {
  try {
    let projects = await Project.find({ isActive: { $ne: false }, status: { $ne: 'inactive' } }).sort({ createdAt: 1 });

    if (!projects || projects.length === 0) {
      // Fallback 1: check Content collection
      const contentDoc = await Content.findOne({ sectionKey: 'projectItems' });
      if (Array.isArray(contentDoc?.data) && contentDoc.data.length > 0) {
        return res.json(contentDoc.data);
      }
      // Fallback 2: static JSON
      return res.json(projectsData);
    }

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let project = await Project.findOne({ slug });

    if (!project) {
      // Fallback 1: check Content collection
      const contentDoc = await Content.findOne({ sectionKey: 'projectItems' });
      if (Array.isArray(contentDoc?.data)) {
        project = contentDoc.data.find(p => p.slug === slug || p.id === slug);
      }
      // Fallback 2: static JSON
      if (!project) {
        project = projectsData.find(p => p.slug === slug || p.id === slug);
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
