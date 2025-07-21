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
exports.sendReply = exports.deleteContact = exports.markContactAsRead = exports.getContactById = exports.getUnreadCount = exports.getAllContacts = exports.createContact = void 0;
const ContactModel_1 = require("../models/ContactModel");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a new contact
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, message, createdAt } = req.body;
        const newContact = yield ContactModel_1.Contact.create({
            name,
            email,
            message,
            createdAt,
        });
        res.status(201).json({ success: true, data: newContact });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.createContact = createContact;
// Get all contacts
const getAllContacts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedContacts = yield ContactModel_1.Contact.find({});
        if (!fetchedContacts || fetchedContacts.length === 0) {
            return res.status(404).json({ success: true, data: [] });
        }
        res.status(200).json({ success: true, data: fetchedContacts });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: "Error => " + error.message });
    }
});
exports.getAllContacts = getAllContacts;
// Get unread messages count
const getUnreadCount = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield ContactModel_1.Contact.countDocuments({ isRead: false });
        res.status(200).json({ success: true, count });
    }
    catch (err) {
        res
            .status(500)
            .json({ success: false, error: "Failed to fetch unread count" });
    }
});
exports.getUnreadCount = getUnreadCount;
// Get contact by ID
const getContactById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield ContactModel_1.Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ success: false, data: null });
        }
        res.status(200).json({ success: true, data: contact });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: "Error => " + error.message });
    }
});
exports.getContactById = getContactById;
// Mark contact as read
const markContactAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ContactModel_1.Contact.findByIdAndUpdate(req.params.id, { isRead: true });
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ success: false, error: "Failed to mark as read" });
    }
});
exports.markContactAsRead = markContactAsRead;
// Delete contact by ID
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedContact = yield ContactModel_1.Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res
                .status(404)
                .json({ success: false, error: "Contact with that id does not exist" });
        }
        res.status(200).json({ success: true, data: deletedContact });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: "Error => " + error.message });
    }
});
exports.deleteContact = deleteContact;
// Reply to a contact message via email
const sendReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, name, message } = req.body;
    if (!to || !message || !name) {
        return res.status(400).json({ success: false, error: "Missing fields" });
    }
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || "587"),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        yield transporter.sendMail({
            from: `"SwiftShop Support" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Re: Your message to SwiftShop",
            text: `Hi ${name},\n\n${message}\n\nBest regards,\nSwiftShop Support Team`,
            html: `
        <p>Hi ${name},</p>
        <p>${message}</p>
        <br/>
        <p>Best regards,<br/>SwiftShop Support Team</p>
      `,
        });
        res
            .status(200)
            .json({ success: true, message: "Reply sent successfully." });
    }
    catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ success: false, error: "Failed to send email" });
    }
});
exports.sendReply = sendReply;
