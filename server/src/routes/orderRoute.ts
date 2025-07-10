import { Router } from "express";
import { Order } from "../models/OrdersModel";

const router = Router();
//POST
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      items,
      total,
      status,
      shippingAddress,
      createdAt,
      updatedAt,
    } = req.body;

    const newOrder = await Order.create({
      userId,
      items,
      total,
      status,
      shippingAddress,
      createdAt,
      updatedAt,
    });

    res.status(201).json({ success: true, data: newOrder });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST

//GET /
router.get("/", async (req, res) => {
  try {
    const fetchedOrders = await Order.find({});
    if (!fetchedOrders || !fetchedOrders.length)
      res.status(404).json({ success: true, data: [] });
    res.status(201).json({ success: true, data: fetchedOrders });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

//GET /:id
router.get("/:id", async (req, res) => {
  try {
    const fetchedOrders = await Order.findOne({ _id: req.params.id });
    if (!fetchedOrders) {
      return res.status(404).json({ success: false, data: null });
    }

    return res.status(200).json({ success: true, data: fetchedOrders });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

//PUT /:id
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedOrder)
      res
        .status(404)
        .json({ success: false, error: "Order with that id does not exist" });
    res.status(201).json({ success: true, data: updatedOrder });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

// DELETE / :id
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      res
        .status(404)
        .json({ success: false, error: "Order with that id does not exist" });
    res.status(201).json({ success: true, data: deletedOrder });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

export { router as orderRouter };
