const {
  register,
  login,
  logout,
  getMyUserProfile,
} = require("../controllers/authController");
const { isAuth } = require("../middleware/auth");

const express = require("express");
const validateResourceMW = require("../middleware/validator");
const { registerSchema, loginSchema } = require("../utils/validator");
const router = express.Router();

router.route("/register").post(validateResourceMW(registerSchema), register);
router.route("/login").post(validateResourceMW(loginSchema), login);
router.route("/logout").post(logout);
router.route("/me").get(isAuth, getMyUserProfile);

module.exports = router;
