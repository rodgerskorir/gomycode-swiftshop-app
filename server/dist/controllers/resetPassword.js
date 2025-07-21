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
exports.resetPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UsersModel_1 = require("../models/UsersModel");
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, password } = req.body;
        if (!token || !password) {
            return res.status(400).json({ error: "Missing token or password" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        if (!userId)
            return res.status(400).json({ error: "Invalid token payload" });
        const user = yield UsersModel_1.Users.findById(userId);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        const hashed = yield bcryptjs_1.default.hash(password, 12);
        user.password = hashed;
        yield user.save();
        return res.json({
            success: true,
            message: "Password updated successfully",
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Invalid or expired token" });
    }
});
exports.resetPassword = resetPassword;
