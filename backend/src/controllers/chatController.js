import Chat from '../models/Chat.js';
import User from '../models/User.js';
import { io } from '../server.js';

// Get or create a chat between two users
export const getOrCreateChat = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;
    
    // Validate that both users exist
    const [currentUser, otherUser] = await Promise.all([
      User.findById(currentUserId),
      User.findById(userId)
    ]);
    
    if (!currentUser || !otherUser) {
      return res.status(404).json({ message: 'One or both users not found' });
    }
    
    // Find existing chat between these users
    const existingChat = await Chat.findOne({
      participants: { $all: [currentUserId, userId] }
    }).populate({
      path: 'participants',
      select: 'name profilePicture'
    }).populate({
      path: 'messages.sender',
      select: 'name profilePicture'
    });
    
    if (existingChat) {
      return res.status(200).json(existingChat);
    }
    
    // Create a new chat if none exists
    const newChat = new Chat({
      participants: [currentUserId, userId],
      messages: []
    });
    
    await newChat.save();
    
    // Populate the participants before sending response
    const populatedChat = await Chat.findById(newChat._id)
      .populate({
        path: 'participants',
        select: 'name profilePicture'
      });
    
    res.status(201).json(populatedChat);
  } catch (error) {
    console.error('Error in getOrCreateChat:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all chats for a user
export const getUserChats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Find all chats where the user is a participant
    const chats = await Chat.find({
      participants: userId
    })
    .populate({
      path: 'participants',
      select: 'name profilePicture'
    })
    .populate({
      path: 'lastMessage.sender',
      select: 'name'
    })
    .sort({ updatedAt: -1 }); // Sort by most recent activity
    
    res.status(200).json(chats);
  } catch (error) {
    console.error('Error in getUserChats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Send a message in a chat
export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;
    const senderId = req.user._id;
    
    // Find the chat and verify the sender is a participant
    const chat = await Chat.findOne({
      _id: chatId,
      participants: senderId
    });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found or you are not a participant' });
    }
    
    // Create the new message
    const newMessage = {
      sender: senderId,
      content,
      timestamp: new Date(),
      read: false
    };
    
    // Update the chat with the new message
    chat.messages.push(newMessage);
    chat.lastMessage = {
      content,
      timestamp: new Date(),
      sender: senderId
    };
    chat.updatedAt = new Date();
    
    await chat.save();
    
    // Populate the sender information for the new message
    const populatedChat = await Chat.findById(chatId)
      .populate({
        path: 'messages.sender',
        select: 'name profilePicture'
      })
      .populate({
        path: 'participants',
        select: 'name profilePicture'
      });
    
    const newMessageWithSender = populatedChat.messages[populatedChat.messages.length - 1];
    
    // Notify other participants about the new message
    const otherParticipants = chat.participants.filter(
      participant => participant.toString() !== senderId.toString()
    );
    
    otherParticipants.forEach(participantId => {
      io.to(participantId.toString()).emit('new-message', {
        chatId,
        message: newMessageWithSender
      });
    });
    
    res.status(201).json(newMessageWithSender);
  } catch (error) {
    console.error('Error in sendMessage:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mark messages as read
export const markMessagesAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;
    
    // Find the chat and verify the user is a participant
    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId
    });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found or you are not a participant' });
    }
    
    // Mark unread messages from other participants as read
    let updated = false;
    chat.messages.forEach(message => {
      if (!message.read && message.sender.toString() !== userId.toString()) {
        message.read = true;
        updated = true;
      }
    });
    
    if (updated) {
      await chat.save();
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in markMessagesAsRead:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
