import type { NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Contact from '../../models/contact';
import withAuth, { NextApiRequestWithAuth } from '../../middleware/withAuth';

async function contactHandler(
  req: NextApiRequestWithAuth,
  res: NextApiResponse
) {
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
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).json({ success: false, message: `Method ${method} not allowed` });
      break;
  }
}

// GET lists/reads all leads' contact info (name/email/phone); DELETE removes a lead.
// Both are admin-only. POST stays public — it's the lead-capture submission endpoint
// used by TripBuilderForm, LockInDrawer, and the /contactus page.
export default function handler(req: NextApiRequestWithAuth, res: NextApiResponse) {
  if (req.method === 'GET' || req.method === 'DELETE') {
    return withAuth(contactHandler, 'admin')(req, res);
  }
  return contactHandler(req, res);
}