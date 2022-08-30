const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

/**
 *
 * @param {{id: mongoose.Types.ObjectId}} payload
 * @returns {string}
 */
const generateToken = payload => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;
