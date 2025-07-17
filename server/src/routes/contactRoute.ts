import { Router } from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  markContactAsRead,
  deleteContact,
  getUnreadCount,
} from "../controllers/contactController";

const router = Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.patch("/:id/read", markContactAsRead); // specific route to mark as read
router.get("/unread-count", getUnreadCount);


router.delete("/:id", deleteContact);

export { router as contactRouter };
