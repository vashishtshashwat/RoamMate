import mongoose from 'mongoose';
import User from './src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkUser() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    const user = await User.findOne({ email: 'chahitkumar25@gmail.com' });
    console.log('User document:', user);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

checkUser();
