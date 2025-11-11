import UserProfileData from '../models/UserProfileData.js';
import mongoose from 'mongoose';

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    const userProfile = await UserProfileData.findOne({ userId: userId });
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
