const express = require("express");
const Booking = require("../models/bookingModel");
const ErrorResponse = require("../utils/errorResponse");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({}).populate(
      "user",
      "id firstName lastName"
    );
    res.status(200).json({ success: true, data: bookings });
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
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.status(200).json({ success: true, data: bookings });
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
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!booking) {
      return next(new ErrorResponse("Order not found", 404));
    }
    res.status(202).json({ success: true, data: booking });
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
const createBooking = async (req, res, next) => {
  const { date, time, reservationName, contactNumber } = req.body;

  try {
    if (!date || !time || !reservationName || !contactNumber) {
      return next(new ErrorResponse("Please add all the fields", 400));
    }

    const booking = await Booking.create({
      user: req.user.id,
      date,
      time,
      reservationName,
      contactNumber,
    });

    res.status(201).json({
      success: true,
      message: "Booking scheduled successfully",
      data: booking,
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
const updateBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new ErrorResponse("Booking not found", 404));
    }

    await Booking.findByIdAndUpdate(req.params.id, req.body);
    const updatedOrder = await Booking.findById(req.params.id);

    res.status(201).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    return next(new ErrorResponse("Couldn't update booking", 400));
  }
};

module.exports = {
  getAllBookings,
  getMyBookings,
  getBookingById,
  updateBookingById,
  createBooking,
};
