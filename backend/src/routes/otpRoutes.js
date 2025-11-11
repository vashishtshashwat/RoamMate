import { Router } from 'express';
import { generateAndSendOTP, verifyUserOTP } from '../controllers/otpController.js';

const router = Router();

// Generate and send OTP
router.post('/send/:userId', generateAndSendOTP);

// Verify OTP
router.post('/verify/:userId', verifyUserOTP);

export default router;
