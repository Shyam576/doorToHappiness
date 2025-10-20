// src/pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user'; // Import your User model

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    await dbConnect(); // Ensure database connection

    const { email, password, role } = req.body; // Include role if you allow setting it on registration

    // --- Basic Validation ---
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    // Add more validation as needed (password strength, email format)
    if (password.length < 6) {
         return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }
    // Basic email format check (consider a library like 'validator' for more robust checks)
    if (!/.+\@.+\..+/.test(email)) {
         return res.status(400).json({ message: 'Invalid email format.' });
    }
    // Role validation (if applicable)
    const allowedRoles = ['admin', 'editor', 'user']; // Match roles in your User model
    if (role && !allowedRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role specified.' });
    }


    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists with this email.' }); // 409 Conflict
        }

        // Create new user instance (password hashing happens via pre-save hook in model)
        const user = new User({
            email,
            password, // Pass plain password, model will hash it
            role: role || process.env.DEFAULT_USER_ROLE || 'user' // Assign role or default
        });

        // Save the user to the database
        await user.save();

        // Important: Don't send the password back, even the hash.
        // Create explicit user response object to avoid TypeScript complex union type issues
        const userResponse = {
            _id: user._id,
            email: user.email,
            role: user.role,
        };
        
        res.status(201).json({ message: 'User registered successfully', user: userResponse });

    } catch (error: any) {
        console.error('Registration error:', error);
        // Handle potential Mongoose validation errors more gracefully
        if (error.name === 'ValidationError') {
             let errors = Object.values(error.errors).map((el: any) => el.message);
             return res.status(400).json({ message: "Validation Error", errors });
        }
        res.status(500).json({ message: 'An error occurred during registration.' });
    }
}