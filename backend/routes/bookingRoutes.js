const express = require("express");
const router = express.Router();
const {
  getAllBookings,
  getMyBookings,
  getBookingById,
  updateBookingById,
  createBooking,
} = require("../controllers/bookingController");
const { isAuth, isAdmin } = require("../middleware/auth");

router
  .route("/")
  .get(isAuth, isAdmin, getAllBookings)
  .post(isAuth, createBooking);
router.route("/mybookings").get(isAuth, getMyBookings);
router.route("/:id").get(isAuth, getBookingById).put(isAuth, updateBookingById);

module.exports = router;
