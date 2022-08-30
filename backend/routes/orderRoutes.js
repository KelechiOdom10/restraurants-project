const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getMyOrders,
  getOrderById,
  getStatusValues,
  createOrders,
  updateOrderStatusById,
} = require("../controllers/orderController");
const { isAuth, isAdmin } = require("../middleware/auth");

router.route("/").get(isAuth, isAdmin, getAllOrders).post(isAuth, createOrders);
router.route("/myorders").get(isAuth, getMyOrders);
router
  .route("/:id")
  .get(isAuth, getOrderById)
  .put(isAuth, isAdmin, updateOrderStatusById);
router.route("/status-values").get(getStatusValues);

module.exports = router;
