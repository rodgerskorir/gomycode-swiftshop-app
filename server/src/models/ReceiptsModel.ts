// models/Receipt.ts
import mongoose, { Schema } from "mongoose";
import { Users } from "../models/UsersModel";

export interface IReceipt {
  orderId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  customerName: string;
  amount: number;
  itemsCount: number;
  paymentMethod: string;
  status: "success" | "failed";
  createdAt?: Date;
}

const receiptSchema = new Schema<IReceipt>(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    customerName: { type: String, required: true },
    amount: { type: Number, required: true },
    itemsCount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, enum: ["success", "failed"], default: "success" },
  },
  { timestamps: true }
);

export const Receipt =
  mongoose.models.Receipt || mongoose.model("Receipt", receiptSchema);
