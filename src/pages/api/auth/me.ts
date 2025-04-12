// src/pages/api/auth/me.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user'; // Your User model

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    if (!JWT_SECRET) {
         console.error("JWT_SECRET not set!");
        return res.status(500).json({ message: 'Configuration error' });
    }

    try {
        const cookies = parse(req.headers.cookie || '');
        const token = cookies.authToken;

        if (!token) {
            return res.status(401).json({ message: 'Not authenticated', user: null });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        await dbConnect();
        // Fetch user details (excluding password) based on token
        // Ensure your User model doesn't return password by default or use .select('-password')
        const user = await User.findById(decoded.userId).select('-password'); // Explicitly exclude

        if (!user) {
             // User might have been deleted after token was issued
             // Clear the potentially invalid cookie
             res.setHeader('Set-Cookie', 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax');
            return res.status(401).json({ message: 'User not found', user: null });
        }

        res.status(200).json({ user });

    } catch (error) {
        // Token verification failed (invalid or expired)
        console.log("Auth 'me' error:", error);
         // Clear the potentially invalid cookie
         res.setHeader('Set-Cookie', 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax');
        res.status(401).json({ message: 'Session expired or invalid', user: null });
    }
}