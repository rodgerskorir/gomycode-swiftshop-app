
import mongoose, { Schema } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  username: string;
  phone: number;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: Number, required: false, unique: true },
});

export const UsersModel =
  mongoose.models.UsersModel || mongoose.model("UsersModel", userSchema);
