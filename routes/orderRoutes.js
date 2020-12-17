import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  getOrderByUser,
  getAllOrders,
  updateOrdertoDelivered
} from "../controllers/orderController.js";

import { protect ,admin} from "../middleware/authMiddleware.js";
router.route("/").post(protect, addOrderItems).get(protect,admin,getAllOrders);
router.route("/orders").get(protect, getOrderByUser);
router.route("/:id").get(protect, getOrderById).put(protect,admin,updateOrdertoDelivered);

export default router;
