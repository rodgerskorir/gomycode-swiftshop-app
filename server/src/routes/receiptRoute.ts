import { Router } from "express";
import { Receipt } from "../models/ReceiptsModel";
import { Order } from "../models/OrdersModel";
import { Users } from "../models/UsersModel"; 
import { getReceiptById, getReceipts } from "../controllers/receiptsController";

const router = Router();

// ============================
// CREATE a receipt (POST /receipts)
// ============================
router.post("/", async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;

    console.log("Creating receipt for orderId:", orderId, "with method:", paymentMethod);

    if (!orderId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: orderId or paymentMethod",
      });
    }

    const order = await Order.findById(orderId).populate("userId", "name");
    if (!order) {
      console.error("Order not found for ID:", orderId);
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const receipt = await Receipt.create({
      orderId: order._id,
      userId: order.userId._id,
      customerName: order.userId.name,
      amount: order.total,
      itemsCount: order.items.length,
      paymentMethod,
      status: "success",
    });

    res.status(201).json({ success: true, data: receipt });
  } catch (error: any) {
    console.error("Error creating receipt:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// ============================
// GET all receipts (GET /receipts)
// ============================
router.get("/", getReceipts);  

// ============================
// GET single receipt (GET /receipts/:id)
// ============================
router.get("/:id", getReceiptById);

// ============================
// UPDATE receipt (PUT /receipts/:id)
// ============================
router.put("/:id", async (req, res) => {
  try {
    const updatedReceipt = await Receipt.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReceipt) {
      return res
        .status(404)
        .json({ success: false, error: "Receipt not found" });
    }

    res.status(200).json({ success: true, data: updatedReceipt });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

// ============================
// DELETE receipt (DELETE /receipts/:id)
// ============================
router.delete("/:id", async (req, res) => {
  try {
    const deletedReceipt = await Receipt.findByIdAndDelete(req.params.id);
    if (!deletedReceipt) {
      return res
        .status(404)
        .json({ success: false, error: "Receipt not found" });
    }

    res.status(200).json({ success: true, data: deletedReceipt });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

export { router as receiptRouter };
