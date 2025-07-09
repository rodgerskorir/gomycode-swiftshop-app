import mongoose, { Schema } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  username: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  // Optional fields with default empty values
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  avatar: { type: String, default: "" },
});

export const Users =
  mongoose.models.Users || mongoose.model("Users", userSchema);
