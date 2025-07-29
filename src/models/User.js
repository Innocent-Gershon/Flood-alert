import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['community', 'admin', 'responder'],
    default: 'community'
  },
  phone: {
    type: String
  },
  region: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('User', UserSchema);