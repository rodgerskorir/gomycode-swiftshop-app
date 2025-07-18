import { Router } from "express";
import { Product } from "../models/ProductModel";
import multer from "multer";
import path from "path";

const router = Router();

// === Multer Setup ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads")); // Save to /uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// === POST / - Create Product with image upload ===
router.post("/", upload.array("images"), async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      description,
      price,
      discount,
      sizes,
      numberOfStock,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No images uploaded." });
    }

    // Build absolute URLs for images
    const imageUrls = (req.files as Express.Multer.File[]).map((file) => {
      return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    });

    const newProduct = new Product({
      name,
      brand,
      category,
      description,
      price: Number(price),
      sizes: sizes.split(",").map((s: string) => s.trim()),
      numberOfStock: Number(numberOfStock),
      image: imageUrls,
      ...(discount !== undefined && discount !== ""
        ? { discount: Number(discount) }
        : {}),
    });

    const saved = await newProduct.save();

    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// UPDATE product
router.put("/:id", upload.single("images"), async (req, res) => {
  try {
    const data: any = {
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      description: req.body.description,
      price: parseFloat(req.body.price),
      discount: parseFloat(req.body.discount),
      numberOfStock: parseInt(req.body.numberOfStock),
      sizes: req.body.sizes.split(",").map((s: string) => s.trim()),
    };

    if (req.file) {
      data.image = [`/uploads/${req.file.filename}`];
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Update error:", err);

    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";

    res.status(500).json({ success: false, message: errorMessage });
  }
});

// === GET / - Get all products ===
router.get("/", async (_req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, data: products });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// === GET /:id - Get single product by ID ===
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// === PUT /:id - Update product ===
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// === DELETE /:id - Delete product ===
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: deletedProduct });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export { router as productRouter };
