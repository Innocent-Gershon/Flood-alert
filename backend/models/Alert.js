import mongoose from 'mongoose';
const AlertSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'moderate', 'high', 'extreme'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  },
  channelsSent: {
    type: [String],
    default: []
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
});
export default mongoose.model('Alert', AlertSchema);