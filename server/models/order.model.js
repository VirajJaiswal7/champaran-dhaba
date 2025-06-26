import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      quantity: Number,
    },
  ],
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true},
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true },
  country: { type: String, required: true },
  phone: { type: Number, required: true },
});

export const Order = mongoose.model("Order", orderSchema);
