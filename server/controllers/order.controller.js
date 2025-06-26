import { Order } from "../models/order.model.js";
import validator from "validator";
import { User } from "../models/user.model.js";

export const sendOrder = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      street,
      city,
      state,
      pincode,
      country,
      phone,
    } = req.body;
    const userId = req.id;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !street ||
      !city ||
      !state ||
      !pincode ||
      !country ||
      !phone
    ) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    // check email exist or not and phone
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Enter valid email structure",
        success: false,
      });
    }

    if (phone.length < 10) {
      return res.status(400).json({
        message: "Enter a vailid phone number",
        success: false,
      });
    }

    // const isEmail = await Order.findOne({ email });
    // if (isEmail) {
    //   return res.status(400).json({
    //     message: "Email already exist try another email",
    //     success: false,
    //   });
    // }

    // const isPhone = await Order.findOne({ phone });
    // if (isPhone) {
    //   return res.status(400).json({
    //     message: "Phone number already exist try another phone number",
    //     success: false,
    //   });
    // }

    const user = await User.findById(userId);

    if (user.cart.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
        success: false,
      });
    }

    const orderedItems = user.cart.map((cartItem) => ({
      itemId: cartItem.itemId?._id,
      quantity: cartItem.quantity,
    }));

    const order = new Order({
      userId,
      items: orderedItems,
      firstname,
      lastname,
      email,
      street,
      city,
      state,
      pincode,
      country,
      phone,
    });

    await order.save();

    user.order.push(order?._id);
    // user.cart = [];
    await user.save();

    const populateUser = await User.findById(userId)
      .populate("order")
      .populate("cart.itemId");

    console.log(populateUser);

    return res.status(201).json({
      message: "Order placed successfully",
      success: true,
      user: populateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internel server error",
      success: false,
    });
  }
};

export const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("userId")
      .populate("items.itemId")
      .sort({ createdAt: -1 });

    console.log(orders);

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch orders",
      success: false,
    });
  }
};

export const orderDelete = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    if (!orderId) {
      return res.status(400).json({
        message: "Please provide a orderId",
        success: false,
      });
    }

    await Order.findByIdAndDelete(orderId);
    return res.status(200).json({
      message: "Order deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch orders",
      success: false,
    });
  }
};
