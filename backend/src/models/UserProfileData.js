import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true, min: 5, max: 100 },
  profileImage: { type: String, required: true },
  address: { type: String },
  bio: { type: String },
  pastTrips: { type: String },
  interests: { type: [String] },
  socialMedia: {
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String }
  },
  email: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('UserProfileData', userProfileSchema);
