import crypto from 'crypto';
import User from '../models/User.js';
import { sendOtpEmail } from './emailService.js';

// Generate a 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Save OTP to user record
export const saveOTP = async (userId, otp) => {
  // OTP expires in 10 minutes
  const otpExpiry = new Date();
  otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
  
  await User.findByIdAndUpdate(userId, {
    otp,
    otpExpiry
  });
};

// Verify OTP
export const verifyOTP = async (userId, otp) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  if (user.otp !== otp) {
    throw new Error('Invalid OTP');
  }
  
  if (user.otpExpiry < new Date()) {
    throw new Error('OTP expired');
  }
  
  // Mark user as verified and clear OTP
  await User.findByIdAndUpdate(userId, {
    isVerified: true,
    otp: null,
    otpExpiry: null
  });
  
  return true;
};

// Generate and send OTP
export const sendOTP = async (userId, email) => {
  const otp = generateOTP();
  await saveOTP(userId, otp);
  await sendOtpEmail(email, otp);
  return otp;
};
