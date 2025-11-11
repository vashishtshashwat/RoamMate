import express from 'express';
import {
  sendNotification,
  updateNotification,
  getNotifications
} from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Send notification
router.post('/', sendNotification);

// Update notification status
router.put('/:id', protect, updateNotification);

// Get user notifications
router.get('/:userId', getNotifications);

export default router;
