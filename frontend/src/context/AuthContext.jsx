import React, { createContext, useContext, useState, useEffect } from 'react';
import { initSocket, closeSocket } from '../services/socketService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('Checking localStorage for user data');
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        console.log('Found user data in localStorage:', storedUser);
        const userData = JSON.parse(storedUser);
        setUser(userData);
        
        // Initialize socket connection
        if (userData._id) {
          initSocket(userData._id);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    } else {
      console.log('No user data found in localStorage');
    }
    
    // Cleanup socket on unmount
    return () => {
      closeSocket();
    };
  }, []);

  const login = (userData) => {
    console.log('Logging in user:', userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Initialize socket connection
    if (userData._id) {
      initSocket(userData._id);
    }
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    localStorage.removeItem('user');
    
    // Close socket connection
    closeSocket();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
