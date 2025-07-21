"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminStats_1 = require("./controllers/adminStats");
const app = (0, express_1.default)();
app.use("/api/admin", adminStats_1.adminStatsRouter);
