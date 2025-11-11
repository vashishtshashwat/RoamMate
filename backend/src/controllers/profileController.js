import UserProfileData from '../models/UserProfileData.js';
import cloudinary from '../../config/cloudinaryConfig.js';

export const createProfile = async (req, res) => {
  try {
    console.log('Incoming request headers:', req.headers);
    console.log('Raw request body:', req.body);
    console.log('Uploaded file:', req.file);

    // Parse form data
    const { 
      firstName, 
      lastName, 
      email,
      age,
      address, 
      bio, 
      pastTrips, 
      interests, 
      socialMedia,
      userId
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !userId || !age) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({ message: 'First name, last name, email, age, and userId are required' });
    }

    // Process file upload
    let profileImageUrl = '';
    if (req.file) {
      try {
        console.log('Starting Cloudinary upload');
        const uploadedResponse = await cloudinary.uploader.upload(req.file.path, {
          folder: 'profile_images',
          use_filename: true,
          unique_filename: false
        });
        profileImageUrl = uploadedResponse.secure_url;
        console.log('Cloudinary upload successful:', profileImageUrl);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({ 
          message: 'Failed to upload profile image',
          details: uploadError.message 
        });
      }
    }

    // Create new profile
    const newProfile = new UserProfileData({
      userId,
      firstName,
      lastName,
      email,
      age,
      address,
      bio,
      pastTrips,
      interests: Array.isArray(interests) ? interests : (interests ? interests.split(',') : []),
      socialMedia: typeof socialMedia === 'string' ? JSON.parse(socialMedia) : socialMedia,
      profileImage: profileImageUrl
    });

    console.log('Creating new profile:', newProfile);
    await newProfile.save();
    console.log('Profile saved successfully');
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error in createProfile:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ 
        message: 'Internal server error',
        details: error.message 
      });
    }
  }
};

export const getProfile = async (req, res) => {
  try {
    console.log('Incoming request headers:', req.headers);
    console.log('Request params:', req.params);
    const profile = await UserProfileData.findById(req.params.id);
    console.log('Retrieved profile:', profile);
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error in getProfile:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log('Incoming request headers:', req.headers);
    console.log('Request body:', req.body);
    console.log('Request params:', req.params);
    console.log('Uploaded file:', req.file);

    const { id } = req.params;
    const updateData = req.body;

    // Validate required fields
    if (!id) {
      console.log('Validation failed: Missing profile ID');
      return res.status(400).json({ message: 'Profile ID is required' });
    }

    // Handle profile image upload
    if (req.file) {
      try {
        console.log('Starting Cloudinary upload');
        const uploadedResponse = await cloudinary.uploader.upload(req.file.path, {
          folder: 'profile_images',
          use_filename: true,
          unique_filename: false
        });
        updateData.profileImage = uploadedResponse.secure_url;
        console.log('Cloudinary upload successful:', updateData.profileImage);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', {
          message: uploadError.message,
          stack: uploadError.stack,
          name: uploadError.name,
          code: uploadError.code
        });
        return res.status(400).json({ 
          message: 'Invalid profile image file',
          details: uploadError.message 
        });
      }
    }

    // Parse and validate interests
    if (updateData.interests) {
      if (typeof updateData.interests === 'string') {
        updateData.interests = updateData.interests.split(',').map(interest => interest.trim());
      } else if (!Array.isArray(updateData.interests)) {
        updateData.interests = [];
      }
    }

    // Parse and validate social media
    if (updateData.socialMedia) {
      if (typeof updateData.socialMedia === 'string') {
        try {
          updateData.socialMedia = JSON.parse(updateData.socialMedia);
        } catch (error) {
          console.error('Error parsing social media:', error);
          return res.status(400).json({ message: 'Invalid social media format' });
        }
      } else if (typeof updateData.socialMedia !== 'object') {
        updateData.socialMedia = {};
      }
    }

    // Update profile
    console.log('Updating profile:', id);
    const updatedProfile = await UserProfileData.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedProfile) {
      console.log('Profile not found:', id);
      return res.status(404).json({ message: 'Profile not found' });
    }

    console.log('Profile updated successfully:', updatedProfile);
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error in updateProfile:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
      requestBody: req.body,
      requestParams: req.params,
      requestFile: req.file
    });

    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const deleteProfile = async (req, res) => {
  try {
    console.log('Incoming request headers:', req.headers);
    console.log('Request params:', req.params);
    const { id } = req.params;
    console.log('Deleting profile:', id);
    await UserProfileData.findByIdAndDelete(id);
    console.log('Profile deleted successfully');
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteProfile:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    res.status(500).json({ message: 'Internal server error' });
  }
};
