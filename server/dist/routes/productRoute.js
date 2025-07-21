"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const ProductModel_1 = require("../models/ProductModel");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
exports.productRouter = router;
// === Multer Setup ===
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../../uploads")); // Save to /uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage });
// === POST / - Create Product with image upload ===
router.post("/", upload.array("images"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, brand, category, description, price, discount, sizes, numberOfStock, } = req.body;
        if (!req.files || req.files.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "No images uploaded." });
        }
        // Build absolute URLs for images
        const imageUrls = req.files.map((file) => {
            return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        });
        const newProduct = new ProductModel_1.Product(Object.assign({ name,
            brand,
            category,
            description, price: Number(price), sizes: sizes.split(",").map((s) => s.trim()), numberOfStock: Number(numberOfStock), image: imageUrls }, (discount !== undefined && discount !== ""
            ? { discount: Number(discount) }
            : {})));
        const saved = yield newProduct.save();
        res.status(201).json({ success: true, data: saved });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}));
// UPDATE product
router.put("/:id", upload.single("images"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            name: req.body.name,
            brand: req.body.brand,
            category: req.body.category,
            description: req.body.description,
            price: parseFloat(req.body.price),
            discount: parseFloat(req.body.discount),
            numberOfStock: parseInt(req.body.numberOfStock),
            sizes: req.body.sizes.split(",").map((s) => s.trim()),
        };
        if (req.file) {
            data.image = [`/uploads/${req.file.filename}`];
        }
        const updated = yield ProductModel_1.Product.findByIdAndUpdate(req.params.id, data, {
            new: true,
        });
        if (!updated)
            return res.status(404).json({ success: false, message: "Not found" });
        res.json({ success: true, data: updated });
    }
    catch (err) {
        console.error("Update error:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        res.status(500).json({ success: false, message: errorMessage });
    }
}));
// === GET / - Get all products ===
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductModel_1.Product.find({});
        return res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}));
// === GET /:id - Get single product by ID ===
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductModel_1.Product.findById(req.params.id);
        if (!product) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, data: product });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}));
// === PUT /:id - Update product ===
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield ProductModel_1.Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedProduct) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, data: updatedProduct });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}));
// === DELETE /:id - Delete product ===
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield ProductModel_1.Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, data: deletedProduct });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}));
