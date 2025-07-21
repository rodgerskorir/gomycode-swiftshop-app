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
exports.uploadAvatar = exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UsersModel_1 = require("../models/UsersModel");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        if ((!email && !username) || !password) {
            return res.status(400).json({
                success: false,
                error: "Email or username and password are required",
            });
        }
        const user = yield UsersModel_1.Users.findOne(email ? { email } : { username });
        if (!user) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials",
            });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials, Try Again",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Server error" });
    }
});
exports.loginUser = loginUser;
// POST /users/upload
const uploadAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (err) {
        console.error("Avatar upload error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.uploadAvatar = uploadAvatar;
