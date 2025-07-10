import mongoose, { Schema } from "mongoose";

export interface User extends Document{
  name: string;
  email: string;
  password: string;
  username: string;
  role: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    // Optional fields with default empty values
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Users =
  mongoose.models.Users || mongoose.model("Users", userSchema);
