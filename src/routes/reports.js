const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
// Get all reports
router.get('/', async (req, res) => {
  try {
    const {
      status
    } = req.query;
    let query = {};
    if (status) {
      query.status = status;
    }
    const reports = await Report.find(query).sort({
      createdAt: -1
    });
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});
// Get single report
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({
        message: 'Report not found'
      });
    }
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});
// Create new report
router.post('/', async (req, res) => {
  try {
    const {
      location,
      reporterName,
      reporterPhone,
      description,
      coordinates,
      images
    } = req.body;
    const report = new Report({
      location,
      reporterName,
      reporterPhone,
      description,
      coordinates,
      images,
      userId: req.user ? req.user.userId : null
    });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});
// Update report status
router.put('/:id', async (req, res) => {
  try {
    const {
      status
    } = req.body;
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({
        message: 'Report not found'
      });
    }
    report.status = status || report.status;
    await report.save();
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});
// Delete report
router.delete('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({
        message: 'Report not found'
      });
    }
    await report.remove();
    res.json({
      message: 'Report removed'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});
module.exports = router;