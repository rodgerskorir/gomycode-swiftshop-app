import { Router } from "express";
import { UsersModel } from "../models/UsersModel";
import { createUser } from "../controllers/userController";

const router = Router();

//POST

router.post("/", createUser);

export { router as userRouter };
