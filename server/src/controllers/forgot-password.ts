import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Users } from "../models/UsersModel";
import { Request, Response } from "express";

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await Users.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "No account found with that email" });

    const secret = process.env.JWT_SECRET!;
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "15m" });

    const resetLink = `http://localhost:5173/reset-password/${token}`; // frontend

    // Set up Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, //  gmail address
        pass: process.env.EMAIL_PASS, //  gmail app password
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"SwiftShop Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    res.status(200).json({ success: true, message: "Reset link sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
