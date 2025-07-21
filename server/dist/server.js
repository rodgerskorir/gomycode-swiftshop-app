"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const dbConnect_1 = require("./db/dbConnect");
const userRoute_1 = require("./routes/userRoute");
const productRoute_1 = require("./routes/productRoute");
const receiptRoute_1 = require("./routes/receiptRoute");
const orderRoute_1 = require("./routes/orderRoute");
const contactRoute_1 = require("./routes/contactRoute");
const path_1 = __importDefault(require("path"));
// Load .env variables
(0, dotenv_1.config)();
// Initialize app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Connect to database
(0, dbConnect_1.dbConnect)();
// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to backend" });
});
// Register user routes
app.use("/swiftshop/users", userRoute_1.userRouter);
app.use("/swiftshop/products", productRoute_1.productRouter); //product route
app.use("/swiftshop/receipts", receiptRoute_1.receiptRouter); //receipt route
app.use("/swiftshop/orders", orderRoute_1.orderRouter); //order route
app.use("/swiftshop/contacts", contactRoute_1.contactRouter); //contact/message route
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Catch-all route for invalid paths
app.use((req, res) => {
    res.status(404).json({ error: "Invalid path" });
});
app.use((req, res) => {
    res.send("API is running.....");
});
// Start server
app.listen(PORT, () => console.log(` App is running on PORT ${PORT}...............`));
