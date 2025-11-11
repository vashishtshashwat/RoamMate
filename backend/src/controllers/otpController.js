import User from '../models/User.js';
import { sendOTP, verifyOTP } from '../services/otpService.js';

// Generate and send OTP to user's email
export const generateAndSendOTP = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate and send OTP
    await sendOTP(userId, user.email);
    
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify OTP
export const verifyUserOTP = async (req, res) => {
  try {
    const { userId } = req.params;
    const { otp } = req.body;
    
    if (!otp) {
      return res.status(400).json({ message: 'OTP is required' });
    }
    
    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Verify OTP
    await verifyOTP(userId, otp);
    
    res.status(200).json({ 
      message: 'Email verified successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isVerified: true
      }
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    
    if (error.message === 'Invalid OTP' || error.message === 'OTP expired') {
      return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};
