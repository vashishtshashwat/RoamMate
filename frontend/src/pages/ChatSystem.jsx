import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, CircularProgress, IconButton } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { getSocket } from '../services/socketService';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';

const useAutoScroll = (ref, dependencies) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, dependencies);
};

const ChatSystem = () => {
  const navigate = useNavigate();
  const { userId: pathUserId } = useParams(); // Get userId from URL params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryUserId = queryParams.get('userId');
  
  // Use either path parameter or query parameter
  const userId = pathUserId || queryUserId;
  
  const { user } = useContext(AuthContext);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const chatContainerRef = useRef(null);
  useAutoScroll(chatContainerRef, [messages]);
  const [messageInput, setMessageInput] = useState('');
  
  // Redirect to path parameter format if using query parameter
  useEffect(() => {
    if (queryUserId && !pathUserId) {
      navigate(`/ChatSystem/${queryUserId}`, { replace: true });
    }
  }, [queryUserId, pathUserId, navigate]);
  
  // Fetch user's chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('/api/chats');
        setChats(response.data);
        setLoading(false);

        // If no chat is selected, open the one with the latest message
        if (!selectedChat && response.data.length > 0) {
          const latestChat = response.data.reduce((prev, current) => 
            new Date(prev.lastMessage?.timestamp) > new Date(current.lastMessage?.timestamp) ? prev : current
          );
          setSelectedChat(latestChat);
          setMessages(latestChat.messages || []);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
        toast.error('Failed to load chats');
        setLoading(false);
      }
    };
    
    fetchChats();
  }, []);
  
  // If userId is provided, get or create chat with that user
  useEffect(() => {
    if (userId && user) {
      const initializeChat = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/api/chats/${userId}`);
          
          // Update chats list if this is a new chat
          const chatExists = chats.some(chat => 
            chat.participants.some(p => p._id === userId)
          );
          
          if (!chatExists) {
            setChats(prevChats => [response.data, ...prevChats]);
          }
          
          // Set this as the selected chat
          setSelectedChat(response.data);
          setMessages(response.data.messages || []);
          setLoading(false);
        } catch (error) {
          console.error('Error initializing chat:', error);
          toast.error('Failed to initialize chat');
          setLoading(false);
        }
      };
      
      initializeChat();
    }
  }, [userId, user]);
  
  // Set up socket listeners for new messages
  useEffect(() => {
    const socket = getSocket();
    
    if (socket) {
      socket.on('new-message', ({ chatId, message }) => {
        // Update messages if this is for the currently selected chat
        if (selectedChat && selectedChat._id === chatId) {
          setMessages(prevMessages => [...prevMessages, message]);
        }
        
        // Update the chats list with the new message
        setChats(prevChats => 
          prevChats.map(chat => {
            if (chat._id === chatId) {
              return {
                ...chat,
                lastMessage: {
                  content: message.content,
                  timestamp: message.timestamp,
                  sender: message.sender
                }
              };
            }
            return chat;
          })
        );
        
        // Show toast notification for new message if not in that chat
        if (!selectedChat || selectedChat._id !== chatId) {
          const senderName = message.sender.name;
          toast.info(`New message from ${senderName}`);
        }
      });
    }
    
    return () => {
      if (socket) {
        socket.off('new-message');
      }
    };
  }, [selectedChat]);
  
  // Mark messages as read when chat is selected
  useEffect(() => {
    if (selectedChat) {
      const markAsRead = async () => {
        try {
          await axios.put(`/api/chats/${selectedChat._id}/read`);
        } catch (error) {
          console.error('Error marking messages as read:', error);
        }
      };
      
      markAsRead();
    }
  }, [selectedChat, messages]);
  
  const handleChatSelect = async (chat) => {
    try {
      setSelectedChat(chat);
      
      // Get the full chat with messages
      const otherUserId = chat.participants.find(p => p._id !== user._id)._id;
      const response = await axios.get(`/api/chats/${otherUserId}`);
      setMessages(response.data.messages || []);
      
      // Mark messages as read
      await axios.put(`/api/chats/${chat._id}/read`);
    } catch (error) {
      console.error('Error loading chat messages:', error);
      toast.error('Failed to load messages');
    }
  };
  
  const handleSendMessage = async (event) => {
    event.preventDefault();
    const messageText = event.target.message.value.trim();
    
    if (!messageText || !selectedChat) return;
    
    try {
      setSendingMessage(true);
      const response = await axios.post(`/api/chats/${selectedChat._id}/messages`, {
        content: messageText
      });
      
      // Add the new message to the messages list
      setMessages(prevMessages => [...prevMessages, response.data]);
      
      // Update the chat's last message
      setChats(prevChats => 
        prevChats.map(chat => {
          if (chat._id === selectedChat._id) {
            return {
              ...chat,
              lastMessage: {
                content: messageText,
                timestamp: new Date(),
                sender: { _id: user._id, name: user.name }
              }
            };
          }
          return chat;
        })
      );
      
      // Reset the form
      event.target.reset();
      setMessageInput('');
      setSendingMessage(false);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      setSendingMessage(false);
    }
  };
  
  // Format timestamp to readable time
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date for message groups
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  
  // Get the other user in a chat
  const getOtherUser = (chat) => {
    if (!chat || !chat.participants) return { name: 'Unknown User' };
    return chat.participants.find(p => p._id !== user._id) || { name: 'Unknown User' };
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };
  
  // Handle key press (send on Enter)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.getElementById('send-message-form').dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  };
  
  if (loading) {
    return (
      <Box className="flex flex-col h-[calc(100vh-80px)]">
        <CircularProgress />
      </Box>
    );
  }
  
  const otherUser = selectedChat?.participants.find(p => p._id !== user._id);
  
  // Filter out duplicate users based on user ID
  const uniqueUsers = Array.from(new Set(chats.map(chat => chat.participants.find(p => p._id !== user._id)._id)))
    .map(id => chats.find(chat => chat.participants.find(p => p._id !== user._id)._id === id));
  
  return (
    <Box className="pt-24 pb-8 min-h-screen bg-gray-50">
      <Box className="container mx-auto px-4">
        {/* Web View */}
        <Box className="hidden md:flex bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-160px)]">
          {/* Chat List */}
          <Box className="w-1/3 lg:w-1/4 border-r border-gray-100 overflow-y-auto">
            <Typography variant="h6" className="p-4 border-b border-gray-100 font-semibold">Chats</Typography>
            <List className="w-full">
              {uniqueUsers.map((chat) => (
                <ListItem
                  button="true"
                  key={chat._id}
                  selected={selectedChat?._id === chat._id}
                  onClick={() => handleChatSelect(chat)}
                  className="flex items-center p-3 hover:bg-gray-50 transition-colors"
                >
                  <ListItemAvatar>
                    <Avatar src={chat.participants.find(p => p._id !== user._id).profileImage} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.participants.find(p => p._id !== user._id).name}
                    primaryTypographyProps={{ className: 'font-medium' }}
                    secondary={chat.lastMessage?.content}
                    secondaryTypographyProps={{ className: 'text-gray-500 truncate' }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Conversation Area */}
          <Box className="flex-1 flex flex-col">
            {selectedChat && (
              <>
                {/* Messages */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #e0e0e0' }}>
                  <Typography variant="h6">Chat</Typography>
                  {otherUser && (
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {otherUser.name}
                    </Typography>
                  )}
                </Box>
                <Box ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4" style={{ height: 'calc(100vh - 200px)', WebkitOverflowScrolling: 'touch' }}>
                  {messages.map((message) => (
                    <Box
                      key={message._id}
                      className={`flex ${message.sender._id === user._id ? 'justify-end' : 'justify-start'}`}
                    >
                      <Box
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender._id === user._id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        <Typography>{message.content}</Typography>
                        <Typography variant="caption" className="block text-right text-gray-500 mt-1">
                          {formatTime(message.timestamp)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Message Input */}
                <Box className="p-4 border-t border-gray-100 bg-white">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      name="message"
                      placeholder="Type a message..."
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      disabled={sendingMessage}
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
                      disabled={sendingMessage}
                    >
                      {sendingMessage ? <CircularProgress size={20} /> : 'Send'}
                    </button>
                  </form>
                </Box>
              </>
            )}
          </Box>
        </Box>

        {/* Mobile View */}
        <Box className="md:hidden bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-160px)]">
          {!selectedChat && (
            <Box className="w-full border-r border-gray-100 overflow-y-auto">
              <Typography variant="h6" className="p-4 border-b border-gray-100 font-semibold">Chats</Typography>
              <List className="w-full">
                {uniqueUsers.map((chat) => (
                  <ListItem
                    button="true"
                    key={chat._id}
                    onClick={() => handleChatSelect(chat)}
                    className="flex items-center p-3 hover:bg-gray-50 transition-colors"
                  >
                    <ListItemAvatar>
                      <Avatar src={chat.participants.find(p => p._id !== user._id).profileImage} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={chat.participants.find(p => p._id !== user._id).name}
                      primaryTypographyProps={{ className: 'font-medium' }}
                      secondary={chat.lastMessage?.content}
                      secondaryTypographyProps={{ className: 'text-gray-500 truncate' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {selectedChat && (
            <Box className="flex flex-col h-[calc(100vh-150px)] md:h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              {/* Conversation Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  <IconButton onClick={() => setSelectedChat(null)}>
                    <ArrowLeft />
                  </IconButton>
                </Box>
                <Typography variant="h6">Chat</Typography>
                {otherUser && (
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {otherUser.name}
                  </Typography>
                )}
              </Box>
              {/* Messages */}
              <Box ref={chatContainerRef} className="flex-1 overflow-y-scroll p-6 space-y-4 h-[calc(100vh-200px)]" style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth', scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 #f3f4f6', minHeight: '200px' }}>
                {messages.map((message) => (
                  <Box
                    key={message._id}
                    className={`flex ${message.sender._id === user._id ? 'justify-end' : 'justify-start'}`}
                  >
                    <Box
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender._id === user._id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      <Typography>{message.content}</Typography>
                      <Typography variant="caption" className="block text-right text-gray-500 mt-1">
                        {formatTime(message.timestamp)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Message Input */}
              <Box className="sticky bottom-0 p-4 border-t border-gray-100 bg-white rounded-b-lg z-10">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    name="message"
                    placeholder="Type a message..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    disabled={sendingMessage}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
                    disabled={sendingMessage}
                  >
                    {sendingMessage ? <CircularProgress size={20} /> : 'Send'}
                  </button>
                </form>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatSystem;
