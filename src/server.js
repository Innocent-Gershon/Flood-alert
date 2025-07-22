const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const alertRoutes = require('./routes/alerts');
const reportRoutes = require('./routes/reports');
// Load environment variables
dotenv.config();
// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/floodalertghana').then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/reports', reportRoutes);
// Default route
app.get('/', (req, res) => {
  res.send('Flood Alert Ghana API is running');
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});