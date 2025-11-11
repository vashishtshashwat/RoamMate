import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSocket } from '../services/socketService';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    
    // Set up socket listeners
    const socket = getSocket();
    if (socket) {
      // Listen for new notifications
      socket.on('new-notification', (notification) => {
        console.log('Received new notification:', notification);
        setNotifications(prev => {
          // Check if notification already exists
          const exists = prev.some(n => n._id === notification._id);
          if (!exists) {
            // Show toast for new notification
            toast.info(`New notification: ${notification.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            return [notification, ...prev];
          }
          return prev;
        });
      });
      
      // Listen for notification updates
      socket.on('update-notification', (updatedNotification) => {
        console.log('Notification updated:', updatedNotification);
        setNotifications(prev => 
          prev.map(n => n._id === updatedNotification._id ? updatedNotification : n)
        );
      });
    }
    
    // Cleanup socket listeners
    return () => {
      if (socket) {
        socket.off('new-notification');
        socket.off('update-notification');
      }
    };
  }, [user._id]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`/api/notifications/${user._id}`);
      // Filter out duplicate notifications
      const uniqueNotifications = [];
      const seenIds = new Set();
      
      response.data.forEach(notification => {
        if (!seenIds.has(notification._id)) {
          seenIds.add(notification._id);
          uniqueNotifications.push(notification);
        }
      });
      
      // Only filter out declined notifications that the current user initiated
      // Keep declined notifications that were sent to the user (they should see these)
      const filteredNotifications = uniqueNotifications.filter(notification => {
        // If it's a declined notification
        if (notification.status === 'declined') {
          // Keep it only if the current user is the receiver (not the sender)
          // This way users will see notifications when others decline their requests
          return notification.receiverId === user._id;
        }
        // Keep all other notifications
        return true;
      });
      
      setNotifications(filteredNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    if (notification.status === 'pending') {
      navigate(`/userdashboard/${notification.senderId._id}`);
    }
  };

  const handleAccept = async (notificationId, senderId, senderName) => {
    try {
      await axios.put(`/api/notifications/${notificationId}`, { status: 'accepted' });
      
      // Display toast message
      toast.success('Your response has been sent!', { 
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Refresh notifications after action
      fetchNotifications();
    } catch (error) {
      console.error('Error accepting notification:', error);
      toast.error('Failed to accept connection request.', { 
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleDecline = async (notificationId, senderId, senderName) => {
    try {
      await axios.put(`/api/notifications/${notificationId}`, { status: 'declined' });
      
      // Display toast message
      toast.success('Your response has been sent!', { 
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Remove the notification from the list
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
    } catch (error) {
      console.error('Error declining notification:', error);
      toast.error('Failed to decline connection request.', { 
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const renderNotificationContent = (notification) => {
    // Use senderName if available, otherwise use senderId.name
    const name = notification.senderName || (notification.senderId?.name || 'User');
    
    if (notification.status === 'pending') {
      return (
        <>
          <p className='font-semibold text-gray-800'>{name} wants to connect</p>
          <p className='text-sm text-gray-600 mt-1'>{notification.message}</p>
        </>
      );
    } else if (notification.status === 'accepted') {
      if (notification.senderId?._id === user._id || notification.senderId === user._id) {
        // This is a notification I sent to someone who accepted
        return (
          <>
            <p className='font-semibold text-gray-800'>Connection Accepted</p>
            <p className='text-sm text-gray-600 mt-1'>{notification.message}</p>
          </>
        );
      } else {
        // This is a notification someone sent to me that I accepted
        return (
          <>
            <p className='font-semibold text-gray-800'>Connection Request</p>
            <p className='text-sm text-gray-600 mt-1'>{name}'s accepted your connection request.</p>
          </>
        );
      }
    } else if (notification.status === 'declined') {
      if (notification.senderId?._id === user._id || notification.senderId === user._id) {
        // This is a notification I sent to someone who declined
        return (
          <>
            <p className='font-semibold text-gray-800'>Connection Declined</p>
            <p className='text-sm text-gray-600 mt-1'>{notification.message}</p>
          </>
        );
      } else {
        // This is a notification someone sent to me that I declined
        return (
          <>
            <p className='font-semibold text-gray-800'>Connection Request</p>
            <p className='text-sm text-gray-600 mt-1'>{name}'s declined your connection request. 😢</p>
          </>
        );
      }
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-1'>
        <div className='max-w-4xl mx-auto px-4 pt-24 pb-8'>
          <div className='bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 relative'>
            <button
              onClick={() => navigate('/userdashboard')}
              className='absolute top-6 right-6 flex items-center gap-1 p-2 text-gray-600 hover:text-gray-800 transition-all duration-200 transform hover:scale-110'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 transition-transform duration-200 hover:scale-110' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
              </svg>
              <span>Back to UserDashboard</span>
            </button>
            <h1 className='text-3xl font-bold mb-8 text-gray-800 border-b pb-4'>Notifications</h1>
            {notifications.length > 0 ? (
              <div className='space-y-4'>
                {notifications.map((notification, index) => (
                  <div
                    key={notification._id}
                    className='p-5 border rounded-xl bg-white/90 hover:bg-white transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-md animate-fade-in-up'
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className='flex justify-between items-center'>
                      <div>
                        {renderNotificationContent(notification)}
                        {notification.hasButton && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle both URL formats
                              const link = notification.buttonLink;
                              if (link.includes('?userId=')) {
                                // Convert old format to new format
                                const userId = link.split('?userId=')[1];
                                navigate(`/ChatSystem/${userId}`);
                              } else {
                                navigate(notification.buttonLink);
                              }
                            }}
                            className='mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105'
                          >
                            {notification.buttonText}
                          </button>
                        )}
                      </div>
                      {notification.status === 'pending' && (
                        <div className='flex gap-2'>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAccept(
                                notification._id, 
                                notification.senderId._id, 
                                notification.senderId.name
                              );
                            }}
                            className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 transform hover:scale-105'
                          >
                            Accept
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecline(
                                notification._id, 
                                notification.senderId._id,
                                notification.senderId.name
                              );
                            }}
                            className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 transform hover:scale-105'
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center h-[50vh] animate-fade-in'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-16 w-16 text-gray-400 mb-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' />
                </svg>
                <p className='text-gray-500 text-xl'>No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Notifications;
