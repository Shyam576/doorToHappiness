import mongoose, { Schema, model, models, Document } from 'mongoose';

interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
  travelMonth?: string;
  tripLength?: string;
  interests?: string[];
  travelParty?: string;
  durationDays?: number;
  adults?: number;
  children?: number;
  travelerType?: string;
  estimatedCostUsd?: number;
  routeSummary?: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Please provide a message.'],
    trim: true,
  },
  // Enquiry origin — 'contact-form' (default, general enquiry), 'trip-builder',
  // or 'journey-architect'
  source: {
    type: String,
    default: 'contact-form',
    trim: true,
  },
  // Trip-builder fields — only populated when source is 'trip-builder'
  travelMonth: {
    type: String,
    trim: true,
  },
  tripLength: {
    type: String,
    trim: true,
  },
  interests: {
    type: [String],
    default: undefined,
  },
  travelParty: {
    type: String,
    trim: true,
  },
  // Journey Architect fields — only populated when source is 'journey-architect'
  durationDays: {
    type: Number,
  },
  adults: {
    type: Number,
  },
  children: {
    type: Number,
  },
  travelerType: {
    type: String,
    trim: true,
  },
  estimatedCostUsd: {
    type: Number,
  },
  routeSummary: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = (models.Contact as mongoose.Model<IContact>) || model<IContact>('Contact', ContactSchema);

export default Contact;