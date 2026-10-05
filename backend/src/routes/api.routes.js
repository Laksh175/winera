import express from 'express';
import { getContent, updateContent, mutateContentItem, adminLogin, uploadImage, upload } from '../controllers/content.controller.js';
import protect from '../middleware/auth.middleware.js';
import leadRoutes from './lead.routes.js';

import { getArcadeProducts, getArcadeProductBySlug } from '../controllers/arcadeProduct.controller.js';

const router = express.Router();

// Public routes
router.get('/content', getContent);
router.get('/arcade-products', getArcadeProducts);
router.get('/arcade-products/:slug', getArcadeProductBySlug);
router.post('/admin/login', adminLogin);

// Lead Inquiry Routes
router.use('/leads', leadRoutes);

// Protected Admin routes
router.put('/admin/content', protect, updateContent);
router.all(['/admin/content-item', '/admin/content-item/:id?'], protect, mutateContentItem);
router.post('/admin/upload', protect, upload.single('image'), uploadImage);

export default router;

