import express from 'express';
import Newsletter from '../models/Newsletter.js';

const router = express.Router();

// The /contact route has been moved to src/routes/contactRoutes.js


// @route   POST api/newsletter
// @desc    Subscribe to newsletter
// @access  Public
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Check if email already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed to our agency newsletter.',
      });
    }

    const subscription = new Newsletter({ email });
    await subscription.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing! Keep an eye on your inbox.',
      data: subscription,
    });
  } catch (error) {
    console.error('Error in /newsletter subscription:', error);
    
    // Duplicate key error handler for safety
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
});

export default router;
