import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  discount: number;
  image: string[];
  sizes: string[];
  inStock: boolean;
  numberOfStock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
     discount: { type: Number, required: false },
    image: [{ type: String, required: true }],
    sizes: [{ type: String }],
    inStock: { type: Boolean, default: true },
    numberOfStock: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.IProduct || mongoose.model("Product", productSchema);
