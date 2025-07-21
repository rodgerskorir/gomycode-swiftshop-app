"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiptRouter = void 0;
const express_1 = require("express");
const ReceiptsModel_1 = require("../models/ReceiptsModel");
const OrdersModel_1 = require("../models/OrdersModel");
const receiptsController_1 = require("../controllers/receiptsController");
const router = (0, express_1.Router)();
exports.receiptRouter = router;
// ============================
// CREATE a receipt (POST /receipts)
// ============================
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, paymentMethod } = req.body;
        console.log("Creating receipt for orderId:", orderId, "with method:", paymentMethod);
        if (!orderId || !paymentMethod) {
            return res.status(400).json({
                success: false,
                error: "Missing required fields: orderId or paymentMethod",
            });
        }
        const order = yield OrdersModel_1.Order.findById(orderId).populate("userId", "name");
        if (!order) {
            console.error("Order not found for ID:", orderId);
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        const receipt = yield ReceiptsModel_1.Receipt.create({
            orderId: order._id,
            userId: order.userId._id,
            customerName: order.userId.name,
            amount: order.total,
            itemsCount: order.items.length,
            paymentMethod,
            status: "success",
        });
        res.status(201).json({ success: true, data: receipt });
    }
    catch (error) {
        console.error("Error creating receipt:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}));
// ============================
// GET all receipts (GET /receipts)
// ============================
router.get("/", receiptsController_1.getReceipts);
// ============================
// GET single receipt (GET /receipts/:id)
// ============================
router.get("/:id", receiptsController_1.getReceiptById);
// ============================
// UPDATE receipt (PUT /receipts/:id)
// ============================
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedReceipt = yield ReceiptsModel_1.Receipt.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReceipt) {
            return res
                .status(404)
                .json({ success: false, error: "Receipt not found" });
        }
        res.status(200).json({ success: true, data: updatedReceipt });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: "Error => " + error.message });
    }
}));
// ============================
// DELETE receipt (DELETE /receipts/:id)
// ============================
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedReceipt = yield ReceiptsModel_1.Receipt.findByIdAndDelete(req.params.id);
        if (!deletedReceipt) {
            return res
                .status(404)
                .json({ success: false, error: "Receipt not found" });
        }
        res.status(200).json({ success: true, data: deletedReceipt });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: "Error => " + error.message });
    }
}));
