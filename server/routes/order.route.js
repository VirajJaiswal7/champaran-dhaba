import express from "express";
import { isAuthenticate } from "../middlewares/isAuthenticate.js";
import {
  getAllOrdersForAdmin,
  orderDelete,
  sendOrder,
} from "../controllers/order.controller.js";
import { adminAuth } from "../middlewares/adminauth.js";

export const orderRoute = express.Router();

orderRoute.post("/send", isAuthenticate, sendOrder);
orderRoute.get("/get", adminAuth, getAllOrdersForAdmin);
orderRoute.delete("/orderdelete/:orderId", adminAuth, orderDelete);
