import { Request, Response } from "express";
import { Product } from "../models/ProductModel"; // replace with actual path
import { Multer } from "multer";

// Inline interface to extend Request for file uploads
interface MulterRequest extends Request {
  files: Express.Multer.File[]; // typing multer files
}

export const addProduct = async (req: MulterRequest, res: Response) => {
  try {
    const { name, brand, category, price, discount, sizes, numberOfStock } = req.body;

    // Access images
    const files = req.files;
    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No images uploaded" });
    }

    // Create URLs for images (or save filenames)
    const imageUrls = files.map((file) => `/uploads/${file.filename}`);

    const newProduct = new Product({
      name,
      brand,
      category,
      price: parseFloat(price),
      discount: parseFloat(discount),
      sizes: sizes.split(",").map((s: string) => s.trim()),
      image: imageUrls,
      numberOfStock: parseInt(numberOfStock),
    });

    await newProduct.save();

    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
