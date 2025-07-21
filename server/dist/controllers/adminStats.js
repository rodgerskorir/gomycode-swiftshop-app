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
exports.adminStatsRouter = void 0;
const express_1 = require("express");
const OrdersModel_1 = require("../models/OrdersModel");
const ProductModel_1 = require("../models/ProductModel");
const UsersModel_1 = require("../models/UsersModel");
const router = (0, express_1.Router)();
exports.adminStatsRouter = router;
router.get("/dashboard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const totalOrders = yield OrdersModel_1.Order.countDocuments();
        const totalRevenue = yield OrdersModel_1.Order.aggregate([
            { $group: { _id: null, total: { $sum: "$total" } } },
        ]);
        const totalUsers = yield UsersModel_1.Users.countDocuments();
        const totalProducts = yield ProductModel_1.Product.countDocuments();
        res.json({
            success: true,
            data: {
                totalOrders,
                totalRevenue: ((_a = totalRevenue[0]) === null || _a === void 0 ? void 0 : _a.total) || 0,
                totalUsers,
                totalProducts,
            },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "Unknown error occurred" });
        }
    }
}));
