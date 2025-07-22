const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// Register a new user
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      region
    } = req.body;
    // Check if user already exists
    let user = await User.findOne({
      email
    });
    if (user) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }
    // Create new user
    user = new User({
      name,
      email,
      password,
      phone,
      region
    });
    await user.save();
    // Create JWT token
    const token = jwt.sign({
      userId: user._id,
      role: user.role
    }, process.env.JWT_SECRET || 'floodalertsecret', {
      expiresIn: '24h'
    });
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});
// Login user
router.post('/login', async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    // Find user
    const user = await User.findOne({
      email
    });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }
    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }
    // Create JWT token
    const token = jwt.sign({
      userId: user._id,
      role: user.role
    }, process.env.JWT_SECRET || 'floodalertsecret', {
      expiresIn: '24h'
    });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});
module.exports = router;