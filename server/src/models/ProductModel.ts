import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  image: string[];
  sizes: string[];
  inStock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, 
    sizes: [{ type: String }], 
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export const Product = mongoose.model<IProduct>("Product", productSchema);
