import jwt from 'jsonwebtoken';

// Middleware to authenticate JWT access token
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded; // Attach decoded user info (id, role) to the request object
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token', details: error.message });
    }
};

// Optional: Middleware to authorize based on role
export const authorizeRole = (role) => (req, res, next) => {
    if (!req.user || req.user.role !== role) {
        return res.status(403).json({ message: `Access restricted to ${role}s only` });
    }
    next();
};