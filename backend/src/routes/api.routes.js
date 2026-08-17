import express from 'express';
import { getContent, updateContent, adminLogin, uploadImage, upload } from '../controllers/content.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/content', getContent);
router.post('/admin/login', adminLogin);

// Protected Admin routes
router.put('/admin/content', protect, updateContent);
router.post('/admin/upload', protect, upload.single('image'), uploadImage);

export default router;

