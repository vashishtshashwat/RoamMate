import UserProfileData from '../models/UserProfileData.js';
import multer from 'multer';

const upload = multer();

// Check if profile exists
const checkProfileExists = async (userId) => {
  try {
    console.log('Checking profile for userId:', userId);
    const profile = await UserProfileData.findOne({ userId: userId });
    console.log('Profile found:', profile);
    return !!profile;
  } catch (error) {
    console.error('Error checking profile:', error);
    return false;
  }
};

// Create profile
const createProfile = upload.none(async (req, res) => {
  try {
    const userId = req.body.userId;
    const profileData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      bio: req.body.bio,
      pastTrips: req.body.pastTrips,
      interests: req.body.interests.split(','),
      socialMedia: JSON.parse(req.body.socialMedia)
    };

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const newProfile = new UserProfileData({ userId, ...profileData });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: error.message });
  }
});

export default {
  checkProfileExists,
  createProfile
};
