import mongoose, { Schema } from "mongoose";

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: {
    productId: mongoose.Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    size: string;
  }[];
  total: number;
  status: "pending" | "canceled" | "delivered";
  shippingAddress: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: String,
        price: Number,
        quantity: Number,
        size: String,
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "canceled", "delivered"],
      default: "pending",
    },
    shippingAddress: { type: String, required: true },
  },
  { timestamps: true }
);

export const Order = mongoose.models.IOrder || mongoose.model("Order", orderSchema)