import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/authController.js';

const router = express.Router();

// Handle OPTIONS requests
router.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

// Password reset routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', (req, res, next) => {
  if (!req.body.token) {
    return res.status(400).json({ message: 'Reset token is required' });
  }
  next();
}, resetPassword);

export default router;
