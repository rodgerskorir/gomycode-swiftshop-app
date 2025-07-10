import { Router } from "express";
import { Contact } from "../models/ContactModel";

const router = Router();
//POST
router.post("/", async (req, res) => {
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
});

// POST

//GET /
router.get("/", async (req, res) => {
  try {
    const fetchedContacts = await Contact.find({});
    if (!fetchedContacts || !fetchedContacts.length)
      res.status(404).json({ success: true, data: [] });
    res.status(201).json({ success: true, data: fetchedContacts });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

//GET /:id
router.get("/:id", async (req, res) => {
  try {
    const fetchedContacts = await Contact.findOne({ _id: req.params.id });
    if (!fetchedContacts) {
      return res.status(404).json({ success: false, data: null });
    }

    return res.status(200).json({ success: true, data: fetchedContacts });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

//PUT /:id
router.put("/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedContact)
      res
        .status(404)
        .json({ success: false, error: "Message with that id does not exist" });
    res.status(201).json({ success: true, data: updatedContact });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

// DELETE / :id
router.delete("/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact)
      res
        .status(404)
        .json({ success: false, error: "Contact with that id does not exist" });
    res.status(201).json({ success: true, data: deletedContact });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

export { router as contactRouter };
