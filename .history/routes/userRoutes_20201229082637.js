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

//getting user profile through protect which give req.user for updating or just getting
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
//rotue to create a new user
router.route("/users").post(createANewUser);
//route to get all users in the database by the admin
router.route("/getusers").get(protect, admin, getAllUsers);

//route related to single id used by admin to delete user or update to admin
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserByID)
  .put(protect, admin, updateUserProfileByAdmin);

export default router;
