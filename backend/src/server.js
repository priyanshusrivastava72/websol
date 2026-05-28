import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Fallback for local dev
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('Backend Running');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`❌ Global Error: ${err.message}`);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
