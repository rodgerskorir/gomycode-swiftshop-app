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
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const UsersModel_1 = require("../models/UsersModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const forgot_password_1 = require("../controllers/forgot-password");
const resetPassword_1 = require("../controllers/resetPassword");
const multer_1 = require("../middleware/multer");
const router = (0, express_1.Router)();
exports.userRouter = router;
//  Register User - POST /swiftshop/users/
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, username, phone, password, role } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield UsersModel_1.Users.create({
            name,
            email,
            username,
            phone,
            password: hashedPassword,
            role,
        });
        res.status(201).json({ success: true, data: newUser });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}));
//  Login - POST /swiftshop/users/login
router.post("/login", userController_1.loginUser);
router.post("/forgot-password", forgot_password_1.forgotPassword);
router.post("/reset-password", resetPassword_1.resetPassword);
//  Upload Avatar - POST /swiftshop/users/upload
router.post("/upload", multer_1.upload.single("avatar"), userController_1.uploadAvatar);
//  Get All Users - GET /swiftshop/users/
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedUsers = yield UsersModel_1.Users.find({});
        if (!fetchedUsers || !fetchedUsers.length)
            return res.status(404).json({ success: true, data: [] });
        res.status(200).json({ success: true, data: fetchedUsers });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: "Error => " + error.message });
    }
}));
//  Get Single User - GET /swiftshop/users/:id
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedUser = yield UsersModel_1.Users.findById(req.params.id);
        if (!fetchedUser)
            return res.status(404).json({ success: false, data: null });
        res.status(200).json({ success: true, data: fetchedUser });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: "Error => " + error.message });
    }
}));
//  Update User - PUT /swiftshop/users/:id
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield UsersModel_1.Users.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedUser)
            return res
                .status(404)
                .json({ success: false, error: "User with that id does not exist" });
        res.status(200).json({ success: true, data: updatedUser });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: "Error => " + error.message });
    }
}));
//  Delete User - DELETE /swiftshop/users/:id
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield UsersModel_1.Users.findByIdAndDelete(req.params.id);
        if (!deletedUser)
            return res
                .status(404)
                .json({ success: false, error: "User with that id does not exist" });
        res.status(200).json({ success: true, data: deletedUser });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: "Error => " + error.message });
    }
}));
