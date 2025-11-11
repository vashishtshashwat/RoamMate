import express from 'express';
import upload from '../config/multerConfig.js';
import { 
  createProfile, 
  getProfile, 
  updateProfile, 
  deleteProfile 
} from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create profile
router.post('/', protect, upload.single('profileImage'), createProfile);

// Get profile
router.get('/:id', protect, getProfile);

// Update profile
router.put('/:id', protect, upload.single('profileImage'), updateProfile);

// Delete profile
router.delete('/:id', protect, deleteProfile);

export default router;
