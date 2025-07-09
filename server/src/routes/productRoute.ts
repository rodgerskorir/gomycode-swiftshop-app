import { Router, Request, Response } from "express";
import { Product } from "../models/ProductModel";

const router = Router();

// POST /api/products - Add a new product
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      name,
      brand,
      category,
      description,
      price,
      image,
      sizes,
      inStock,
    } = req.body;

    // Basic validation
    if (!name || !brand || !category || !description || !price || !image) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    const newProduct = new Product({
      name,
      brand,
      category,
      description,
      price,
      image,
      sizes,
      inStock,
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({ success: true, data: savedProduct });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Server error: " + error.message,
    });
  }
});

export { router as productRouter };
