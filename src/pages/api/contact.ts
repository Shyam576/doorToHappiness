import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Contact from '../../models/contact';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await dbConnect();
  } catch (error: any) {
    console.error('Database connection error:', error);
    return res.status(500).json({ 
      message: 'Database connection error',
      error: error.message 
    });
  }

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        if (req.query.id) {
          // GET /api/contact?id=[id] - Get a single contact by ID
          const contact = await Contact.findById(req.query.id);
          if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
          }
          res.status(200).json({ success: true, data: contact });
        } else {
          // GET /api/contact - Get all contacts
          const contacts = await Contact.find({});
          res.status(200).json({ success: true, data: contacts });
        }
      } catch (error: any) {
        console.error("Error getting contact(s):", error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      try {
        const contact = await Contact.create(req.body);
        res.status(201).json({ success: true, data: contact });
      } catch (error: any) {
        console.error("Error creating contact:", error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        if (!req.query.id) {
          return res.status(400).json({ success: false, message: 'ID is required for deletion' });
        }

        const deletedContact = await Contact.findByIdAndDelete(req.query.id);
        if (!deletedContact) {
          return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.status(200).json({ success: true, data: {} }); // Or send the deleted contact data
      } catch (error: any) {
        console.error("Error deleting contact:", error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'OPTIONS']);
      res.status(405).json({ success: false, message: `Method ${method} not allowed` });
      break;
  }
}