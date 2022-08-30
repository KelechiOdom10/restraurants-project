const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");
const { isAuth, isAdmin } = require("../middleware/auth");

router.route("/").get(getAllProducts).post(isAuth, isAdmin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(isAuth, isAdmin, updateProductById)
  .delete(isAuth, isAdmin, deleteProductById);

module.exports = router;
