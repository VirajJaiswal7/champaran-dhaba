import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    cart: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
        },
        quantity: { type: Number, default: 1, min: 1 },
      },
    ],
    order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
