// src/models/User.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    email: string;
    password?: string; // Optional because it will be removed in toJSON
    role?: 'admin' | 'editor' | 'user'; // Define your roles
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the schema
const UserSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false, // Hide password by default when querying
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'user'], // Allowed roles
        default: process.env.DEFAULT_USER_ROLE || 'user', // Default role
    },
}, {
    timestamps: true, // Add createdAt and updatedAt timestamps
});

// --- Middleware ---

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password') || !this.password) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err: any) {
        next(err);
    }
});

// --- Methods ---

// Method to compare password for login
UserSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  // 'this.password' is accessible here because we used function() {} notation
  // Need to explicitly select password if it wasn't selected in the query
  if (!this.password) {
     throw new Error('Password not available for comparison. Query user with +password selection.');
  }
  return bcrypt.compare(candidatePassword, this.password);
};

// Modify thetoJSON method to remove password when converting to JSON
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password; // Remove password field
  return userObject;
}


// Prevent recompiling the model if it already exists
const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;