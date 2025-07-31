// src/routes/alerts.js

import express from 'express';
import Alert from '../models/Alert.js';

const router = express.Router(); // ✅ Properly initialize router

// Get all alerts
router.get('/', async (req, res) => {
  try {
    const { region, severity } = req.query;
    let query = {};

    if (region && region !== 'All Regions') {
      query.region = region;
    }
    if (severity) {
      query.severity = severity;
    }

    const alerts = await Alert.find(query).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single alert
router.get('/:id', async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    res.json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new alert
router.post('/', async (req, res) => {
  try {
    const {
      location,
      region,
      severity,
      message,
      coordinates,
      channelsSent
    } = req.body;

    const alert = new Alert({
      location,
      region,
      severity,
      message,
      coordinates,
      channelsSent,
      createdBy: req.user ? req.user.userId : null
    });

    await alert.save();
    res.status(201).json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update alert
router.put('/:id', async (req, res) => {
  try {
    const {
      location,
      region,
      severity,
      message,
      coordinates,
      channelsSent,
      active
    } = req.body;

    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    alert.location = location || alert.location;
    alert.region = region || alert.region;
    alert.severity = severity || alert.severity;
    alert.message = message || alert.message;
    alert.coordinates = coordinates || alert.coordinates;
    alert.channelsSent = channelsSent || alert.channelsSent;
    alert.active = active !== undefined ? active : alert.active;

    await alert.save();
    res.json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete alert
router.delete('/:id', async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    await alert.remove();
    res.json({ message: 'Alert removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
