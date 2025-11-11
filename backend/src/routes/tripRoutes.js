import express from 'express';
import { createTrip, explorePeople, getHistory, deleteTrip } from '../controllers/tripController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new trip
router.post('/', protect, createTrip);

// Explore people
router.get('/explore', protect, explorePeople);

// Get trip history
router.get('/history', protect, getHistory);

// Delete a trip
router.delete('/:id', protect, deleteTrip);

export default router;
