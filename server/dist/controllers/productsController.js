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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = void 0;
const ProductModel_1 = require("../models/ProductModel"); // replace with actual path
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newProduct = new ProductModel_1.Product({
            name,
            brand,
            category,
            price: parseFloat(price),
            discount: parseFloat(discount),
            sizes: sizes.split(",").map((s) => s.trim()),
            image: imageUrls,
            numberOfStock: parseInt(numberOfStock),
        });
        yield newProduct.save();
        res.status(201).json({ success: true, product: newProduct });
    }
    catch (err) {
        console.error("Error saving product:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.addProduct = addProduct;
