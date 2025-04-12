// src/pages/api/auth/logout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize,SerializeOptions } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // Clear the authentication cookie by setting its expiration date to the past
    const cookieOptions:SerializeOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0), // Set expiry date to the past
        path: '/',
        sameSite: 'lax',
    };

    res.setHeader('Set-Cookie', serialize('authToken', '', cookieOptions)); // Set empty value

    res.status(200).json({ message: 'Logout successful' });
}