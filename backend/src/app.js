import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser'
import connect from './DB/dbconnection.js';
import authRoutes from './routes/auth.js';
import tripRoutes from './routes/tripRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import userProfileRoutes from './routes/userProfileRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';
import upload from './config/multerConfig.js';
import viewProfileRoutes from './routes/viewprofileroute.js';
import passwordResetRoutes from './routes/authRoutes.js';
import otpRoutes from './routes/otpRoutes.js';

connect();
const app = express();
const server = http.createServer(app);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(cors({
  origin: ['http://localhost:5173','https://roam-mate.vercel.app'] , // Update if your client is hosted elsewhere
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Create logs directory if it doesn't exist
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create error log stream
const errorLogStream = fs.createWriteStream(path.join(logDir, 'error.log'), { flags: 'a' });
process.removeAllListeners('warning');
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/password-reset', passwordResetRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/user/profile', userProfileRoutes);
app.use('/api/viewprofile', viewProfileRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/otp', otpRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const errorMessage = `${new Date().toISOString()} - ${err.stack}\n`;
  errorLogStream.write(errorMessage);
  console.error(errorMessage);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173','https://roam-mate.vercel.app'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    console.log(`User connected: ${userId}`);
    socket.join(userId);
  }

  socket.on('disconnect', () => {
    if (userId) {
      console.log(`User disconnected: ${userId}`);
      socket.leave(userId);
    }
  });
});

export { app, server, io, upload };
