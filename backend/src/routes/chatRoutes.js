import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  getOrCreateChat, 
  getUserChats, 
  sendMessage, 
  markMessagesAsRead 
} from '../controllers/chatController.js';

const router = express.Router();

// Get all chats for the authenticated user
router.get('/', protect, getUserChats);

// Get or create a chat with another user
router.get('/:userId', protect, getOrCreateChat);

// Send a message in a chat
router.post('/:chatId/messages', protect, sendMessage);

// Mark messages as read
router.put('/:chatId/read', protect, markMessagesAsRead);

export default router;
