import Trip from '../models/Trip.js';
import User from '../models/User.js'; // Assuming User model is defined in this file

// Create a new trip
 const createTrip = async (req, res) => {
  try {
    const { name, age, address, travelingTo, fromDate, toDate, interests, groupSize } = req.body;
    const trip = new Trip({
      name,
      age,
      address,
      travelingTo,
      fromDate,
      toDate,
      interests,
      groupSize,
      user: req.user._id
    });
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const explorePeople = async (req, res) => {
  try {
    // Get the current user's ID from the request
    const currentUserId = req.user._id;
    
    // Find all trips except those created by the current user
    const trips = await Trip.find({ user: { $ne: currentUserId } })
                           .populate('user', '_id name email')
                           .sort({ createdAt: -1 });
    
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip history' });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip' });
  }
};

export { createTrip, explorePeople, getHistory, deleteTrip };
