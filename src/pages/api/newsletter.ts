import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Newsletter from '../../models/newsletter';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    await dbConnect();
  } catch (error: any) {
    console.error('Database connection error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Database connection error',
    });
  }

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // GET /api/newsletter - Get all newsletter subscribers (admin only)
        const subscribers = await Newsletter.find({ isActive: true })
          .select('email subscribedAt')
          .sort({ subscribedAt: -1 });
        
        res.status(200).json({ 
          success: true, 
          message: 'Newsletter subscribers retrieved successfully',
          data: subscribers 
        });
      } catch (error: any) {
        console.error("Error getting newsletter subscribers:", error);
        res.status(400).json({ 
          success: false, 
          message: error.message 
        });
      }
      break;

    case 'POST':
      try {
        const { email } = req.body;

        // Validate email
        if (!email) {
          return res.status(400).json({ 
            success: false, 
            message: 'Email address is required.' 
          });
        }

        // Check if email already exists
        const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase() });
        
        if (existingSubscriber) {
          if (existingSubscriber.isActive) {
            return res.status(400).json({ 
              success: false, 
              message: 'This email is already subscribed to our newsletter.' 
            });
          } else {
            // Reactivate subscription
            existingSubscriber.isActive = true;
            existingSubscriber.subscribedAt = new Date();
            existingSubscriber.unsubscribedAt = undefined;
            await existingSubscriber.save();
            
            return res.status(200).json({ 
              success: true, 
              message: 'Welcome back! Your newsletter subscription has been reactivated.',
              data: existingSubscriber 
            });
          }
        }

        // Create new subscription
        const newSubscriber = await Newsletter.create({ email: email.toLowerCase() });
        
        res.status(201).json({ 
          success: true, 
          message: 'Thank you for subscribing! You will receive our latest travel updates and offers.',
          data: newSubscriber 
        });
      } catch (error: any) {
        console.error("Error subscribing to newsletter:", error);
        
        if (error.code === 11000) {
          // Duplicate key error
          return res.status(400).json({ 
            success: false, 
            message: 'This email is already subscribed to our newsletter.' 
          });
        }
        
        res.status(400).json({ 
          success: false, 
          message: error.message || 'Failed to subscribe to newsletter. Please try again.' 
        });
      }
      break;

    case 'DELETE':
      try {
        const { email } = req.body;

        if (!email) {
          return res.status(400).json({ 
            success: false, 
            message: 'Email address is required.' 
          });
        }

        const subscriber = await Newsletter.findOne({ email: email.toLowerCase() });
        
        if (!subscriber) {
          return res.status(404).json({ 
            success: false, 
            message: 'Email address not found in our newsletter list.' 
          });
        }

        if (!subscriber.isActive) {
          return res.status(400).json({ 
            success: false, 
            message: 'This email is already unsubscribed.' 
          });
        }

        // Soft delete - mark as inactive
        subscriber.isActive = false;
        subscriber.unsubscribedAt = new Date();
        await subscriber.save();

        res.status(200).json({ 
          success: true, 
          message: 'You have been successfully unsubscribed from our newsletter.',
          data: subscriber 
        });
      } catch (error: any) {
        console.error("Error unsubscribing from newsletter:", error);
        res.status(400).json({ 
          success: false, 
          message: error.message || 'Failed to unsubscribe. Please try again.' 
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).json({ 
        success: false, 
        message: `Method ${method} Not Allowed` 
      });
  }
}
