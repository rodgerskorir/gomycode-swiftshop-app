import { Router } from "express";
import { Receipt } from "../models/ReceiptsModel";

const router = Router();
//POST
router.post("/", async (req, res) => {
  try {
    const { orderId, amount, paymentMethod, status, createdAt } = req.body;

    const newReceipt = await Receipt.create({
      orderId,
      amount,
      paymentMethod,
      status,
      createdAt,
    });

    res.status(201).json({ success: true, data: newReceipt });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST

//GET /
router.get("/", async (req, res) => {
  try {
    const fetchedReceipt = await Receipt.find({});
    if (!fetchedReceipt || !fetchedReceipt.length)
      res.status(404).json({ success: true, data: [] });
    res.status(201).json({ success: true, data: fetchedReceipt });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

//GET /:id
router.get("/:id", async (req, res) => {
  try {
    const fetchedReceipt = await Receipt.findOne({ _id: req.params.id });
    if (!fetchedReceipt) {
      return res.status(404).json({ success: false, data: null });
    }

    return res.status(200).json({ success: true, data: fetchedReceipt });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

//PUT /:id
router.put("/:id", async (req, res) => {
  try {
    const updatedReceipt = await Receipt.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedReceipt)
      res
        .status(404)
        .json({ success: false, error: "Receipt with that id does not exist" });
    res.status(201).json({ success: true, data: updatedReceipt });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

// DELETE / :id
router.delete("/:id", async (req, res) => {
  try {
    const deletedReceipt = await Receipt.findByIdAndDelete(req.params.id);
    if (!deletedReceipt)
      res
        .status(404)
        .json({ success: false, error: "Receipt with that id does not exist" });
    res.status(201).json({ success: true, data: deletedReceipt });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

export { router as receiptRouter };
