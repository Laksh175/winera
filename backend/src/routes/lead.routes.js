import express from 'express';
import {
  createLead,
  getLeads,
  deleteLead,
  bulkDeleteLeads,
  updateLeadStatus
} from '../controllers/lead.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

// Public route for lead submission
router.post('/', createLead);

// Admin protected routes
router.get('/', protect, getLeads);
router.delete('/:id', protect, deleteLead);
router.post('/bulk-delete', protect, bulkDeleteLeads);
router.patch('/:id/status', protect, updateLeadStatus);

export default router;
