// src/server.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import router from './routes/auth.js';
import alertRoutes from './routes/alerts.js';
import reportRoutes from './routes/reports.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
// ✅ CORS: Allow frontend (put before express.json)
app.use(
  cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());



// ✅ MongoDB Connection
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// ✅ Routes
app.use('/api/auth', router);
app.use('/api/alerts', alertRoutes);
app.use('/api/reports', reportRoutes);

// ✅ Health Check
app.get('/api/ping', (req, res) => res.send('pong'));

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('🌍 Flood Alert Ghana API is running');
});

// ✅ Fallback 404
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
