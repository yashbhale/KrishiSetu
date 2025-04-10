import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connect.db.js';
import userRoutes from './routes/user.route.js'; // Import user routes

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', userRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Farmer E-Commerce Platform API is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});