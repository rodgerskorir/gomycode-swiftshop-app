import bcrypt from "bcrypt";
import { Router, Request, Response, NextFunction, response } from "express";
import { Users } from "../models/UsersModel";
import { loginUser } from "../controllers/userController";

const router = Router();

//Regiter //POST
router.post("/", async (req, res) => {
  try {
    const { name, email, username, phone, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // 🔐 Hash password

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

// POST /swiftshop/users/login
router.post("/login", loginUser);

//GET /
router.get("/", async (req, res) => {
  try {
    const fetchedUsers = await Users.find({});
    if (!fetchedUsers || !fetchedUsers.length)
      res.status(404).json({ success: true, data: [] });
    res.status(201).json({ success: true, data: fetchedUsers });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

//GET /:id
router.get("/:id", async (req, res) => {
  try {
    const fetchedUser = await Users.findOne({ _id: req.params.id });
    if (!fetchedUser) {
      return res.status(404).json({ success: false, data: null });
    }

    return res.status(200).json({ success: true, data: fetchedUser });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

//PUT /:id
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser)
      res
        .status(404)
        .json({ success: false, error: "Todo with that id does not exist" });
    res.status(201).json({ success: true, data: updatedUser });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

// DELETE / :id
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      res
        .status(404)
        .json({ success: false, error: "User with that id does not exist" });
    res.status(201).json({ success: true, data: deletedUser });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});


export { router as userRouter };
