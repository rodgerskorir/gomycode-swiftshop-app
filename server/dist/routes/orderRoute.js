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
exports.orderRouter = void 0;
const express_1 = require("express");
const OrdersModel_1 = require("../models/OrdersModel");
const router = (0, express_1.Router)();
exports.orderRouter = router;
//POST
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, items, total, status, shippingAddress, createdAt, updatedAt, } = req.body;
        const newOrder = yield OrdersModel_1.Order.create({
            userId,
            items,
            total,
            status,
            shippingAddress,
            createdAt,
            updatedAt,
        });
        res.status(201).json({ success: true, data: newOrder });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}));
// POST
//GET /
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedOrders = yield OrdersModel_1.Order.find({});
        if (!fetchedOrders || !fetchedOrders.length)
            res.status(404).json({ success: true, data: [] });
        res.status(201).json({ success: true, data: fetchedOrders });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: "Error => " + error.message });
    }
}));
//GET /:id
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedOrders = yield OrdersModel_1.Order.findOne({ _id: req.params.id });
        if (!fetchedOrders) {
            return res.status(404).json({ success: false, data: null });
        }
        return res.status(200).json({ success: true, data: fetchedOrders });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: "Error => " + error.message });
    }
}));
// GET /user/:userId
router.get("/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield OrdersModel_1.Order.find({ userId: req.params.userId }); // userId is assumed to be field in Order
        return res.status(200).json({ success: true, data: orders });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}));
//PUT /:id
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrder = yield OrdersModel_1.Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedOrder)
            res
                .status(404)
                .json({ success: false, error: "Order with that id does not exist" });
        res.status(201).json({ success: true, data: updatedOrder });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: "Error => " + error.message });
    }
}));
// DELETE / :id
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedOrder = yield OrdersModel_1.Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder)
            res
                .status(404)
                .json({ success: false, error: "Order with that id does not exist" });
        res.status(201).json({ success: true, data: deletedOrder });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, error: "Error => " + error.message });
    }
}));
