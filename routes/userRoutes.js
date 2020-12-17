import express from "express";
import {
  loginUser,
  getUserProfile,
  createANewUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  updateUserProfileByAdmin,
  getUserByID,
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
//desc  fetch all products from data base
//route get api/product
// access public
router.post("/login", loginUser);
//desc  fetch currently loged in user
//route get api/product
// access private
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/users").post(createANewUser);
router.route("/getusers").get(protect, admin, getAllUsers);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserByID)
  .put(protect, admin, updateUserProfileByAdmin);

export default router;
