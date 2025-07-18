import { Router } from "express";
import { loginUser, uploadAvatar } from "../controllers/userController";
import { Users } from "../models/UsersModel";
import bcrypt from "bcrypt";

import { forgotPassword } from "../controllers/forgot-password";
import { resetPassword } from "../controllers/resetPassword";
import { upload } from "../middleware/multer";

const router = Router();

//  Register User - POST /swiftshop/users/
router.post("/", async (req, res) => {
  try {
    const { name, email, username, phone, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      name,
      email,
      username,
      phone,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ success: true, data: newUser });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//  Login - POST /swiftshop/users/login
router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

//  Upload Avatar - POST /swiftshop/users/upload
router.post("/upload", upload.single("avatar"), uploadAvatar);

//  Get All Users - GET /swiftshop/users/
router.get("/", async (req, res) => {
  try {
    const fetchedUsers = await Users.find({});
    if (!fetchedUsers || !fetchedUsers.length)
      return res.status(404).json({ success: true, data: [] });

    res.status(200).json({ success: true, data: fetchedUsers });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

//  Get Single User - GET /swiftshop/users/:id
router.get("/:id", async (req, res) => {
  try {
    const fetchedUser = await Users.findById(req.params.id);
    if (!fetchedUser)
      return res.status(404).json({ success: false, data: null });

    res.status(200).json({ success: true, data: fetchedUser });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

//  Update User - PUT /swiftshop/users/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedUser)
      return res
        .status(404)
        .json({ success: false, error: "User with that id does not exist" });

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

//  Delete User - DELETE /swiftshop/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res
        .status(404)
        .json({ success: false, error: "User with that id does not exist" });

    res.status(200).json({ success: true, data: deletedUser });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

export { router as userRouter };
