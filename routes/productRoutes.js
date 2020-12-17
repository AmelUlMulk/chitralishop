import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  deleteAProduct,
  updateProduct,
  createAProduct,
  createProductReview,
  getTopRatedProduct
} from "../controllers/products.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
//desc  fetch all products from data base
//route get api/product
// access public
router.route("/").get(getAllProducts).post(protect, admin, createAProduct);
router.route("/:id/reviews").post(protect,createProductReview);
router.get('/top',getTopRatedProduct)
//desc  fetch a product from data base
//route get api/product/:id
// access public
router
  .route("/:id")
  .get(getSingleProduct)
  .delete(protect, admin, deleteAProduct)
  .put(protect, admin, updateProduct);

export default router;
