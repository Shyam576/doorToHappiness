// src/pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/user'; // Your Mongoose User model
import dbConnect from '../../../lib/dbConnect'; // Your DB connection helper
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { serialize, SerializeOptions } from 'cookie';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET; // MUST be set in environment variables!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Hello from Backend")
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    if (!JWT_SECRET) {
        console.error("FATAL: JWT_SECRET not set!");
        return res.status(500).json({ message: 'Internal server configuration error.' });
    }

    await dbConnect(); // Ensure DB connection

    const { email, password } = req.body;

    // Basic Validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Find user and explicitly select the password field which is hidden by default
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            console.log(`Login attempt failed: User not found for email ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' }); // Use generic message
        }

        // Compare password (user.comparePassword should exist if defined correctly in the model)
        // Or compare directly if the method isn't preferred
        // const isPasswordMatch = await user.comparePassword(password);
        const isPasswordMatch = await bcrypt.compare(password, user.password!); // Use direct bcrypt compare


        if (!isPasswordMatch) {
             console.log(`Login attempt failed: Incorrect password for email ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' }); // Use generic message
        }

        // --- Generate JWT ---
        const payload = {
             userId: (user._id as mongoose.Types.ObjectId).toString(), // Ensure it's a string if needed
             role: user.role || 'user', // Include role
             // Add other relevant non-sensitive info if needed
         };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); // Example: 1 day expiration

        // --- Set HttpOnly Cookie ---
        const cookieOptions:SerializeOptions = {
            httpOnly: true, // Crucial for security
            secure: process.env.NODE_ENV !== 'development', // Use Secure flag in production (HTTPS)
            maxAge: 60 * 60 * 24, // 1 day in seconds matches JWT expiry
            path: '/', // Cookie available site-wide
            sameSite: 'lax', // Good default for CSRF protection
        };
        // Replace 'authToken' with your consistent cookie name
        res.setHeader('Set-Cookie', serialize('authToken', token, cookieOptions));

        // --- Send Success Response ---
        // Send back user info (password is removed by model's toJSON or default selection)
        const userResponse = {
            _id: user._id,
            email: user.email,
            role: user.role,
        };
        
        res.status(200).json({
            message: 'Login successful',
            user: userResponse,
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
}