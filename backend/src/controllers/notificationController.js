import Notification from '../models/Notification.js';
import { io } from '../server.js';

// Send notification
export const sendNotification = async (req, res) => {
  try {
    const { senderId, receiverId, message, status, senderName } = req.body;
    const notification = new Notification({ 
      senderId, 
      receiverId, 
      message, 
      status,
      senderName: senderName || '' 
    });
    await notification.save();
    io.to(receiverId.toString()).emit('new-notification', notification);
    console.log(`Sent new notification to ${receiverId}`);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update notification status
export const updateNotification = async (req, res) => {
  try {
    const { status } = req.body;
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('senderId', 'name profilePicture');

    // Send a notification back to the sender
    if (status === 'accepted') {
      const acceptedNotification = new Notification({
        senderId: req.user._id, // The user who accepted the request
        receiverId: notification.senderId._id, // The original sender
        message: `${req.user.name} has accepted your connection request.`,
        senderName: req.user.name, // Add sender's name explicitly
        type: 'accepted',
        hasButton: true,
        buttonText: 'Chat Now',
        buttonLink: `/ChatSystem/${req.user._id}`, 
        status: 'accepted',
      });
      await acceptedNotification.save();
      io.to(notification.senderId._id.toString()).emit('new-notification', acceptedNotification);
      console.log(`Sent acceptance notification to ${notification.senderId._id}`);
    } else if (status === 'declined') {
      const declinedNotification = new Notification({
        senderId: req.user._id, // The user who declined the request
        receiverId: notification.senderId._id, // The original sender
        message: `${req.user.name} has declined your connection request.`,
        senderName: req.user.name, // Add sender's name explicitly
        type: 'declined',
        status: 'declined',
      });
      await declinedNotification.save();
      io.to(notification.senderId._id.toString()).emit('new-notification', declinedNotification);
      console.log(`Sent decline notification to ${notification.senderId._id}`);
    }

    io.to(notification.receiverId.toString()).emit('update-notification', notification);
    console.log(`Sent update notification to ${notification.receiverId}`);
    res.json(notification);
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get user notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ receiverId: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('senderId', 'name profilePicture');
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
