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
exports.getReceiptById = exports.getReceipts = void 0;
const OrdersModel_1 = require("../models/OrdersModel");
const ReceiptsModel_1 = require("../models/ReceiptsModel");
// GET all receipts
const getReceipts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield OrdersModel_1.Order.find()
            .populate("userId", "name")
            .sort({ createdAt: -1 });
        const receipts = orders.map((order) => {
            var _a, _b;
            return ({
                _id: order._id,
                customerName: (_b = (_a = order.userId) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "Unknown",
                createdAt: order.createdAt,
                amount: order.total,
                itemsCount: order.items.length,
            });
        });
        res.status(200).json({ success: true, data: receipts });
    }
    catch (error) {
        console.error("Error fetching receipts:", error);
        res.status(500).json({ success: false, message: "Failed to fetch receipts" });
    }
});
exports.getReceipts = getReceipts;
// GET a single receipt by ID
const getReceiptById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receipt = yield ReceiptsModel_1.Receipt.findById(req.params.id)
            .populate("userId", "name email address phone")
            .populate("orderId");
        if (!receipt) {
            return res.status(404).json({ success: false, error: "Receipt not found" });
        }
        res.json({ success: true, data: receipt });
    }
    catch (err) {
        res.status(500).json({ success: false, error: "Failed to load receipt" });
    }
});
exports.getReceiptById = getReceiptById;
