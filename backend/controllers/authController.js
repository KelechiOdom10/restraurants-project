const bcrypt = require("bcrypt");
const cookie = require("cookie");
const express = require("express");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");
const generateToken = require("../utils/jwtGenerator");

const isProduction = process.env.NODE_ENV === "production";

/**
 * @typedef {object} registerRequestBody
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} password
 *
 * @param {express.Request<{}, {}, registerRequestBody>} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email || !firstName || !lastName || !password) {
    return next(new ErrorResponse("Please fill out all necessary fields", 422));
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return next(new ErrorResponse("User already exists!", 422));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201);
    res.json({
      success: true,
      message: "User successfully created",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @typedef {object} loginRequestBody
 * @property {string} email
 * @property {string} password
 *
 * @param {express.Request<{},{}, loginRequestBody>} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("You must enter both email and password", 422)
    );
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("User not found, please sign up", 422));
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const token = generateToken({ id: user.id });

    res
      .status(200)
      .set(
        "Set-Cookie",
        cookie.serialize("token", token, {
          // domain: isProduction ? process.env.DOMAIN_VERCEL_URL : "localhost",
          sameSite: isProduction ? "none" : "strict",
          httpOnly: true,
          secure: isProduction,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          path: "/",
        })
      )
      .json({
        success: true,
        message: "Successfully logged in!",
        token: token,
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
 * @returns
 */
const logout = async (req, res, next) => {
  res.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      // domain: isProduction ? process.env.DOMAIN_VERCEL_URL : "localhost",
      sameSite: isProduction ? "none" : "strict",
      secure: isProduction,
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    })
  );
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const getMyUserProfile = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({
        status: false,
        message: "Please Log in first!",
      });
    }

    res.status(200).json({
      status: true,
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, getMyUserProfile };
