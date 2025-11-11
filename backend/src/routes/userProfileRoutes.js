import express from 'express';
import UserProfileData from '../models/UserProfileData.js';
import userProfileController from '../controllers/userProfileController.js';

const router = express.Router();

// Check if profile data exists
router.get('/:userId', async (req, res) => {
  try {
    const profile = await UserProfileData.findOne({ userId: req.params.userId });
    res.json({ exists: !!profile });
  } catch (error) {
    res.status(500).json({ message: 'Error checking profile data' });
  }
});

// Get profile image URL
router.get('/profile-image/:userId', async (req, res) => {
  try {
    const profile = await UserProfileData.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({ imageUrl: profile.profileImage });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile image' });
  }
});

// Create profile
router.post('/api/profile', userProfileController.createProfile);

export default router;
