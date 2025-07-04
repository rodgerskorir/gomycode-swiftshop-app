import { Router } from "express";
import { UsersModel } from "../models/UsersModel";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";

const router = Router();

//POST

router.post("/", createUser);

//get all users
router.get("/", getAllUsers);

//get users by id

router.get("/:id", getUserById);

//Update a User
router.put("/:id", updateUser);

// DELETE a user
router.delete("/:id", deleteUser);

export { router as userRouter };
