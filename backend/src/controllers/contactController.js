import Contact from '../models/Contact.js';
import { sendLeadNotification } from '../services/emailService.js';

// @desc    Submit a new contact form
// @route   POST /api/contact
// @access  Public
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, business, message, capabilities } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !business || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Save to database
    const newContact = await Contact.create({
      name,
      email,
      phone,
      business,
      message,
      capabilities: capabilities || [],
    });

    // Trigger Email Notification (Non-blocking / safe)
    sendLeadNotification({
      name,
      email,
      phone,
      business,
      message,
      capabilities: capabilities || [],
    });

    // Send success response
    return res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: newContact, // Optionally send the saved data back for verification
    });
  } catch (error) {
    console.error(`❌ Contact submission error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};
