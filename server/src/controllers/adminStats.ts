import { Router } from "express";
import { Order } from "../models/OrdersModel";

import { Product } from "../models/ProductModel";
import { Users } from "../models/UsersModel";

const router = Router();

router.get("/dashboard", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);
    const totalUsers = await Users.countDocuments();
    const totalProducts = await Product.countDocuments();

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalUsers,
        totalProducts,
      },
    });
  } catch (error) {
  if (error instanceof Error) {
    res.status(500).json({ success: false, error: error.message });
  } else {
    res.status(500).json({ success: false, error: "Unknown error occurred" });
  }
}

});

export { router as adminStatsRouter };
