import { Router } from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  markContactAsRead,
  deleteContact,
  getUnreadCount,
  sendReply,
} from "../controllers/contactController";

const router = Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/unread-count", getUnreadCount);
router.get("/:id", getContactById);
router.patch("/:id/read", markContactAsRead); // specific route to mark as read
router.post("/reply", sendReply);

router.delete("/:id", deleteContact);

export { router as contactRouter };
