import { Request, Response } from "express";
import { Order } from "../models/OrdersModel";
import { Receipt } from "../models/ReceiptsModel";

// GET all receipts
export const getReceipts = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    const receipts = orders.map((order) => ({
      _id: order._id,
      customerName: (order.userId as any)?.name ?? "Unknown",
      createdAt: order.createdAt,
      amount: order.total,
      itemsCount: order.items.length,
    }));

    res.status(200).json({ success: true, data: receipts });
  } catch (error) {
    console.error("Error fetching receipts:", error);
    res.status(500).json({ success: false, message: "Failed to fetch receipts" });
  }
};

// GET a single receipt by ID
export const getReceiptById = async (req: Request, res: Response) => {
  try {
    const receipt = await Receipt.findById(req.params.id)
      .populate("userId", "name email address phone")
      .populate("orderId");

    if (!receipt) {
      return res.status(404).json({ success: false, error: "Receipt not found" });
    }

    res.json({ success: true, data: receipt });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to load receipt" });
  }
};
