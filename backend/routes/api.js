import express from 'express';
import Contact from '../models/Contact.js';
import Newsletter from '../models/Newsletter.js';

const router = express.Router();

// @route   POST api/contact
// @desc    Submit a contact form query
// @access  Public
router.post('/contact', async (req, res) => {
  try {
    const { name, email, services, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, and message.',
      });
    }

    const contact = new Contact({
      name,
      email,
      services,
      budget,
      message,
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message submitted successfully. Our team will contact you soon!',
      data: contact,
    });
  } catch (error) {
    console.error('Error in /contact submission:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
});

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
