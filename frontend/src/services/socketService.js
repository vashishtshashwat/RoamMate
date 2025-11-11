import { io } from 'socket.io-client';

// Create a singleton socket instance
let socket;

export const initSocket = (userId) => {
  if (!socket) {
    socket = io('http://localhost:3000', {
      query: { userId }
    });
    
    console.log('Socket initialized for user:', userId);
    
    // Setup event listeners
    socket.on('connect', () => {
      console.log('Socket connected');
    });
    
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
    
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }
  
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    console.warn('Socket not initialized. Call initSocket first.');
  }
  return socket;
};

export const closeSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('Socket closed');
  }
};
