const express = require("express");
const Product = require("../models/productModel");
const ErrorResponse = require("../utils/errorResponse");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("category");
    res.status(200).json({ success: true, data: products });
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
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return next(new ErrorResponse("No product found", 404));
    }
    res.status(202).json({ success: true, data: product });
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
const createProduct = async (req, res, next) => {
  const { title, price, image, category, inStock, description } = req.body;

  if (!title || !price || !category || !inStock || !description) {
    return next(new ErrorResponse("Please add all the fields", 400));
  }

  try {
    const product = await Product.create({
      title,
      price,
      image: image
        ? image
        : "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg",
      category,
      inStock,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Successfully created new Product!",
      data: product,
    });
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
const updateProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorResponse("No product found", 404));
    }

    await Product.findByIdAndUpdate(req.params.id, req.body);
    const updatedProduct = await Product.findById(req.params.id);

    res.status(201).json({
      success: true,
      message: "Successfully updated Product!",
      data: updatedProduct,
    });
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
const deleteProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorResponse("No product found", 404));
    }
    await product.remove();
    res
      .status(202)
      .json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
