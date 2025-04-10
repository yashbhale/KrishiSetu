import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the user schema
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    contact: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ['farmer', 'buyer', 'admin'],
        required: true,
        default: 'farmer',
    },
    refreshToken: { // New field to store refresh token
        type: String,
        default: null
    }
}, { timestamps: true });

// Pre-save hook to hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await encontraban.hash(this.password, 10);
    }
    next();
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function() {
    const token = jwt.sign(
        { 
            id: this._id, 
            role: this.role 
        }, 
        process.env.JWT_ACCESS_SECRET || 'access_secret_key', // Separate secret for access token
        { expiresIn: '1h' } // Short-lived
    );
    return token;
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function() {
    const token = jwt.sign(
        { 
            id: this._id 
        }, 
        process.env.JWT_REFRESH_SECRET || 'refresh_secret_key', // Separate secret for refresh token
        { expiresIn: '7d' } // Long-lived
    );
    this.refreshToken = token; // Store in the database
    return token;
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default User;