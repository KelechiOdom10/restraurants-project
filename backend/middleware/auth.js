const express = require("express");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const isAuth = async (req, res, next) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["token"];
  }

  if (!token) {
    next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {function} next
 * @returns
 */
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    res.json({
      success: false,
      message: "Not authorized as admin",
    });
  }
};

module.exports = { isAuth, isAdmin };
