import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Users } from "../models/UsersModel";

import path from "path";
import fs from "fs";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
      return res.status(400).json({
        success: false,
        error: "Email or username and password are required",
      });
    }

    const user = await Users.findOne(email ? { email } : { username });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials, Try Again",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};



interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
// POST /users/upload
export const uploadAvatar = async (req: MulterRequest, res: Response) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No avatar file uploaded" });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      url: fileUrl,
    });
  } catch (err) {
    console.error("Avatar upload error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};