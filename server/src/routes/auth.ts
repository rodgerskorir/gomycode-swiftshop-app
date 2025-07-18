import express from "express";
import { loginUser, logoutUser, getCurrentUser } from "../controllers/authController";
import { authenticate } from "../middleware/authenticate";


const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", authenticate, getCurrentUser);

export default router;
