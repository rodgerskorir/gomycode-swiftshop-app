import { Request, Response } from "express";
import { Contact } from "../models/ContactModel";

// Create a new contact
export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message, createdAt } = req.body;

    const newContact = await Contact.create({
      name,
      email,
      message,
      createdAt,
    });

    res.status(201).json({ success: true, data: newContact });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all contacts
export const getAllContacts = async (_req: Request, res: Response) => {
  try {
    const fetchedContacts = await Contact.find({});
    if (!fetchedContacts || fetchedContacts.length === 0) {
      return res.status(404).json({ success: true, data: [] });
    }

    res.status(200).json({ success: true, data: fetchedContacts });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Error => " + error.message });
  }
};

// GET /contacts/unread-count
export const getUnreadCount = async (req: Request, res: Response) => {
  try {
    const count = await Contact.countDocuments({ isRead: false });
    res.status(200).json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch unread count" });
  }
};

// Get contact by ID
export const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, data: null });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Error => " + error.message });
  }
};

// PATCH /contacts/:id/read
export const markContactAsRead = async (req: Request, res: Response) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to mark as read" });
  }
};





// Delete contact by ID
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ success: false, error: "Contact with that id does not exist" });
    }

    res.status(200).json({ success: true, data: deletedContact });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Error => " + error.message });
  }
};
