"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
const router = (0, express_1.Router)();
exports.contactRouter = router;
router.post("/", contactController_1.createContact);
router.get("/", contactController_1.getAllContacts);
router.get("/unread-count", contactController_1.getUnreadCount);
router.get("/:id", contactController_1.getContactById);
router.patch("/:id/read", contactController_1.markContactAsRead); // specific route to mark as read
router.post("/reply", contactController_1.sendReply);
router.delete("/:id", contactController_1.deleteContact);
