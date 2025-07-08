import mongoose, { Schema } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  username: string;
  phone: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String, required: false, unique: true },
});

export const Users =
  mongoose.models.Users || mongoose.model("Users", userSchema);