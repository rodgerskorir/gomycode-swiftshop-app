import { Router } from "express";
import { Product } from "../models/ProductModel";

const router = Router();
//POST
router.post("/", async (req, res) => {
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
      numberOfStock,
      createdAt,
      updatedAt,
    } = req.body;

    const newProduct = await Product.create({
   
      name,
      brand,
      category,
      description,
      price,
      image,
      sizes,
      inStock,
      numberOfStock,
      createdAt,
      updatedAt,
    });

    res.status(201).json({ success: true, data: newProduct });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST

//GET /
router.get("/", async (req, res) => {
  try {
    const fetchedProducts = await Product.find({});
    if (!fetchedProducts || !fetchedProducts.length)
      res.status(404).json({ success: true, data: [] });
    res.status(201).json({ success: true, data: fetchedProducts });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

//GET /:id
router.get("/:id", async (req, res) => {
  try {
    const fetchedProducts = await Product.findOne({ _id: req.params.id });
    if (!fetchedProducts) {
      return res.status(404).json({ success: false, data: null });
    }

    return res.status(200).json({ success: true, data: fetchedProducts });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

//PUT /:id
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedProduct)
      res
        .status(404)
        .json({ success: false, error: "Product with that id does not exist" });
    res.status(201).json({ success: true, data: updatedProduct });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

// DELETE / :id
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      res
        .status(404)
        .json({ success: false, error: "Product with that id does not exist" });
    res.status(201).json({ success: true, data: deletedProduct });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

export { router as productRouter };
