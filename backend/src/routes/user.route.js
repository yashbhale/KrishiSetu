import express from 'express';
import { 
    registerUser, 
    loginUser, 
    refreshToken, 
    logoutUser 
} from '../controllers/user.auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js'; // Middleware to authenticate JWT
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to authenticate JWT access token
// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

//     if (!token) {
//         return res.status(401).json({ message: 'Access token required' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
//         req.user = decoded; // Attach decoded user info (id, role) to request
//         next();
//     } catch (error) {
//         return res.status(403).json({ message: 'Invalid or expired token' });
//     }
// };

// Authentication routes (public)
router.post('/register', registerUser);    // Register a new user
router.post('/login', loginUser);          // Login and get tokens
router.post('/refresh', refreshToken);     // Refresh access token
router.post('/logout', logoutUser);        // Logout and invalidate refresh token

// Example protected route (optional)
router.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ 
        message: `Welcome to the ${req.user.role} dashboard`, 
        user: { id: req.user.id, role: req.user.role }
    });
});

export default router;