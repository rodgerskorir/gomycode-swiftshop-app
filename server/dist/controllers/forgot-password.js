"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const UsersModel_1 = require("../models/UsersModel");
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ error: "Email is required" });
        const user = yield UsersModel_1.Users.findOne({ email });
        if (!user)
            return res.status(404).json({ error: "No account found with that email" });
        const secret = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ id: user._id }, secret, { expiresIn: "15m" });
        const resetLink = `http://localhost:5173/reset-password/${token}`; // frontend
        // Set up Nodemailer
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, //  gmail address
                pass: process.env.EMAIL_PASS, //  gmail app password
            },
        });
        // Send the email
        yield transporter.sendMail({
            from: `"SwiftShop Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Reset Your Password",
            html: `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
        });
        res.status(200).json({ success: true, message: "Reset link sent!" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.forgotPassword = forgotPassword;
