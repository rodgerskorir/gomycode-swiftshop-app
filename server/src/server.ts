import express, { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import cors from "cors";
import { dbConnect } from "./db/dbConnect";
import { userRouter } from "./routes/userRoute";
import { productRouter } from "./routes/productRoute";
import { receiptRouter } from "./routes/receiptRoute";
import { orderRouter } from "./routes/orderRoute";
import { contactRouter } from "./routes/contactRoute";
import path from "path";

// Load .env variables
config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
dbConnect();

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to backend" });
});

// Register user routes (e.g., /swiftshop/users/register, /swiftshop/users/login)
app.use("/swiftshop/users", userRouter);
app.use("/swiftshop/products", productRouter); //product route
app.use("/swiftshop/receipts", receiptRouter); //receipt route
app.use("/swiftshop/orders", orderRouter); //order route
app.use("/swiftshop/contacts", contactRouter); //contact/message route
app.use("uploads/", express.static(path.join(__dirname, "../uploads")));

// Catch-all route for invalid paths
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Invalid path" });
});

// Start server
app.listen(PORT, () => console.log(`✅ App is running on PORT ${PORT}`));
