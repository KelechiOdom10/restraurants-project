const express = require("express");
const { Order } = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorResponse = require("../utils/errorResponse");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate(
      "user",
      "id firstName lastName"
    );
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "user",
      "id email"
    );
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new ErrorResponse("Order not found", 404));
    }
    res.status(202).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const createOrders = async (req, res, next) => {
  const { products, address, phoneNumber, total } = req.body;

  try {
    if (products && products.length === 0) {
      return next(new ErrorResponse("No order items", 400));
    }

    const newOrder = new Order({
      user: req.user.id,
      products,
      address,
      phoneNumber,
      total,
    });

    products.forEach(async item => {
      const oldProduct = await Product.findById(item.product);
      await Product.findByIdAndUpdate(item.product, {
        inStock: oldProduct.inStock - item.quantity,
        sold: oldProduct.sold + item.quantity,
      });
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message:
        "Thanks for your order! We will contact you to confirm the order.",
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Response} res
 */
const getStatusValues = async (req, res) => {
  const values = await Order.schema.path("status").enumValues;
  res.status(200).json({ data: values });
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const updateOrderStatusById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorResponse("Order not found", 404));
    }

    await Order.findByIdAndUpdate(req.params.id, req.body);
    const updatedOrder = await Order.findById(req.params.id);

    res.status(201).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    return next(new ErrorResponse("Couldn't update order", 400));
  }
};

module.exports = {
  getAllOrders,
  getMyOrders,
  getOrderById,
  createOrders,
  getStatusValues,
  updateOrderStatusById,
};
