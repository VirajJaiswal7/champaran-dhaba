import express from "express";
import {
  adminLogin,
  adminLogout,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import { isAuthenticate } from "../middlewares/isAuthenticate.js";

export const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/logout", isAuthenticate, logout);
userRoute.post("/adminlogin", adminLogin);
userRoute.get("/adminlogout", adminLogout);
