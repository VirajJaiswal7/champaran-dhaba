import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    // check email already exist or correct format
    const user = await User.findOne({ email }).select("-password");
    if (user) {
      return res.status(400).json({
        message: "Email already exist try another email",
        success: false,
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "write a correct structure format email",
        success: false,
      });
    }

    // hashed password for securty resion
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const tokenData = {
      userId: newUser.id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        message: "User register successfully",
        success: true,
        user: newUser,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    // check email or password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invailid credentials",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invailid credentials",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        message: "User logged in successfully",
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.id; // Only works if token middleware adds req.id

    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        user.cart = []; // 🧹 Clear cart
        await user.save();
      }
    }

    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
      })
      .json({ message: "User logout successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    // check email or password
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(400).json({
        message: "Invailid credentials",
        success: false,
      });
    }

    const tokenData = {
      adminEmail: process.env.ADMIN_EMAIL,
    };

    const token = await jwt.sign(tokenData, process.env.ADMIN_JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .cookie("adminToken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({
        message: "logged in successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const adminLogout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("adminToken", " ", { maxAge: 0, httpOnly: true })
      .json({
        message: "Logout successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
