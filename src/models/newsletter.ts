import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

const NewsletterSchema = new Schema<INewsletter>({
  email: {
    type: String,
    required: [true, 'Please provide an email address.'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please provide a valid email address.'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  unsubscribedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// Create compound index for better performance
NewsletterSchema.index({ email: 1, isActive: 1 });

const Newsletter = (models.Newsletter as mongoose.Model<INewsletter>) || model<INewsletter>('Newsletter', NewsletterSchema);

export default Newsletter;
