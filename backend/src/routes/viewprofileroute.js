import express from 'express';
import {getUserProfile} from '../controllers/viewprofilecontroller.js';

const router = express.Router();

// Define routes here
router.get('/:userId', getUserProfile);

export default router;
