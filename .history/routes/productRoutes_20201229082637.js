import express from "express";
//fetching controller functions from the controller
import {
  getAllProducts,
  getSingleProduct,
  deleteAProduct,
  updateProduct,
  createAProduct,
  createProductReview,
  getTopRatedProduct
} from "../controllers/products.js";
//middleware for authorization and authentication
import { admin, protect } from "../middleware/authMiddleware.js";
//setting up the router
const router = express.Router();
//desc  fetch all products from data base
//route get api/product
// access public
router.route("/").get(getAllProducts).post(protect, admin, createAProduct);//Only admin accessable route to fetch all products

router.route("/:id/reviews").post(protect,createProductReview);//creating product review accesable only by registered user
router.get('/top',getTopRatedProduct) //public route to fetch top rated products
//desc  fetch a product from data base
//route get api/product/:id
// access public


router
  .route("/:id")
  .get(getSingleProduct)
  .delete(protect, admin, deleteAProduct)
  .put(protect, admin, updateProduct);//operations related to a single product

export default router;
