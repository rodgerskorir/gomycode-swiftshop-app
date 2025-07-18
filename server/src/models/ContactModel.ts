import mongoose, { Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
  isRead: Boolean;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Contact = mongoose.models.IContact || mongoose.model("Contact", contactSchema);