import express from 'express';
import { getContent, updateContent, mutateContentItem, adminLogin, uploadImage, upload, syncSitemapController, getSitemapXmlController } from '../controllers/content.controller.js';
import protect from '../middleware/auth.middleware.js';
import leadRoutes from './lead.routes.js';

import { getArcadeProducts, getArcadeProductBySlug, createArcadeProduct, updateArcadeProduct, deleteArcadeProduct } from '../controllers/arcadeProduct.controller.js';
import { getVrGames, getVrGameBySlug, createVrGame, updateVrGame, deleteVrGame } from '../controllers/vrGame.controller.js';
import { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } from '../controllers/blog.controller.js';
import { getProjects, getProjectBySlug, createProject, updateProject, deleteProject } from '../controllers/project.controller.js';

const router = express.Router();

// Public routes
router.get('/content', getContent);
router.get('/sitemap.xml', getSitemapXmlController);
router.get('/projects', getProjects);
router.get('/projects/:slug', getProjectBySlug);
router.get('/arcade-products', getArcadeProducts);
router.get('/arcade-products/:slug', getArcadeProductBySlug);
router.get('/vr-games', getVrGames);
router.get('/vr-games/:slug', getVrGameBySlug);
router.get('/blogs', getBlogs);
router.get('/blogs/:slug', getBlogBySlug);
router.post('/admin/login', adminLogin);

// Lead Inquiry Routes
router.use('/leads', leadRoutes);

// Protected Admin routes
router.put('/admin/content', protect, updateContent);
router.all(['/admin/content-item', '/admin/content-item/:id?'], protect, mutateContentItem);
router.post('/admin/arcade-products', protect, createArcadeProduct);
router.put('/admin/arcade-products/:id', protect, updateArcadeProduct);
router.delete('/admin/arcade-products/:id', protect, deleteArcadeProduct);
router.post('/admin/vr-games', protect, createVrGame);
router.put('/admin/vr-games/:id', protect, updateVrGame);
router.delete('/admin/vr-games/:id', protect, deleteVrGame);
router.post('/admin/blogs', protect, createBlog);
router.put('/admin/blogs/:id', protect, updateBlog);
router.delete('/admin/blogs/:id', protect, deleteBlog);
router.post('/admin/projects', protect, createProject);
router.put('/admin/projects/:id', protect, updateProject);
router.delete('/admin/projects/:id', protect, deleteProject);
router.post('/admin/upload', protect, upload.single('image'), uploadImage);
router.post('/admin/sitemap/sync', protect, syncSitemapController);

export default router;

