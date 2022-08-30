const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

const orderSchema = new mongoose.Schema(
  {
    products: [cartItemSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      default: 0.0,
    },
    status: {
      type: String,
      default: "Paid & Preparing",
      enum: ["Paid & Preparing", "On it's way!", "Delivered", "Cancelled"],
    },
    paymentId: {},
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, CartItem };
