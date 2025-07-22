const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  reporterName: {
    type: String,
    required: true
  },
  reporterPhone: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'resolved'],
    default: 'pending'
  },
  coordinates: {
    type: [Number]
  },
  images: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
module.exports = mongoose.model('Report', ReportSchema);