import mongoose, { Schema } from "mongoose";

export interface IReceipt extends Document {
  orderId: mongoose.Types.ObjectId;
  amount: number;
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
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, enum: ["success", "failed"], default: "success" },
  },
  { timestamps: true }
);

export const Receipt =
  mongoose.models.IReceipt || mongoose.model("Receipt", receiptSchema);
