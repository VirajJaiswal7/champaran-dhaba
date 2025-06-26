import express from "express";
import {
  addItem,
  addItemInCart,
  decreaseCartItemQuantity,
  deleteItem,
  getItem,
  increaseCartItemQuantity,
  removeFromCart,
  saveItem,
  updateItem,
} from "../controllers/item.controller.js";
import { adminAuth } from "../middlewares/adminauth.js";
import { upload } from "../utils/multer.js";
import { isAuthenticate } from "../middlewares/isAuthenticate.js";

export const itemRoute = express.Router();

itemRoute.post(
  "/additem",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addItem
);
itemRoute.get("/getitem", getItem);
itemRoute.delete("/deleteitem/:itemId", adminAuth, deleteItem);
itemRoute.put("/updateitem/:itemId", adminAuth, updateItem);
itemRoute.get("/saveitem/:itemId", isAuthenticate, saveItem);
itemRoute.get("/addcart/:itemId", isAuthenticate, addItemInCart);
itemRoute.delete("/removecart/:itemId", isAuthenticate, removeFromCart);
itemRoute.put("/increase/:itemId", isAuthenticate, increaseCartItemQuantity);
itemRoute.put("/decrease/:itemId", isAuthenticate, decreaseCartItemQuantity);
