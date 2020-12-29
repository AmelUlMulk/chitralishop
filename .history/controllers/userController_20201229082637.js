import User from "../modals/userModal.js";
import asyncHandler from "../middleware/async.js";
//utility function to sign jwt token
import signToken from "../utils/jsonToken.js";

//authentication a user
const loginUser = asyncHandler(async (req, res, next) => {
  //gettting the email and password from the body
  const { email, password } = req.body;
  //looking up the email in the database
  const user = await User.findOne({ email });
 //if there is user and the passwords match return the an object containing user details
  if (user && (await user.matchPasswords(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: signToken(user._id),
    });
  } else {
    //if email or passwords don't match throw error
    res.status(401);
    throw new Error("inValid Email or Password");
  }
});

//Get current user profile
const getUserProfile = asyncHandler(async (req, res) => {
  //getting user profile from the req.user added by protect middleware
  const user = await User.findById(req.user._id);
  //if there is user return an object
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Error not Found");
  }
});
//Delete A User
const deleteUser = asyncHandler(async (req, res) => {
  //find through email
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({
      Message: "User Removed",
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});
//Get All User By admin protected Route

const getAllUsers = asyncHandler(async (req, res) => {
  //getting all the users by the admin
  const users = await User.find({});
  res.json(users);
});
//Create a New User
const createANewUser = asyncHandler(async (req, res, next) => {
  //registering a new user
  const { name, email, password } = req.body;
  //checking already existed email
  const userExists = await User.findOne({ email });
 // if there is a user return error 
  if (userExists) {
    res.status(401);
    throw new Error("User Already Exists");
  }
  // else create a new user
  const user = await User.create({
    name,
    email,
    password,
  });
  //return an object with the newly created user details
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: signToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
//Update Profile
const updateUserProfile = asyncHandler(async (req, res, next) => {
  //updating a user profile
  const { name, email, password } = req.body;
  //taking out the to be updated parts
  const user = await User.findById(req.user._id);
  //finding the user in database
  if (user) {
    //checking the fields to be updated, only the fields which are passed in the body will be updated
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    //saving the updated fileds
    const updatedUser = await user.save();
   //returning the updated user
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: signToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//get User By Id'
const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User Not Found");
  }
});
//Update User Profile By Admin
const updateUserProfileByAdmin = asyncHandler(async (req, res, next) => {

  //admin route to update user by admin

  const user = await User.findById(req.params.id);
// same as above just isAdmin option in new
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

export {
  loginUser,
  getUserProfile,
  createANewUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserByID,
  updateUserProfileByAdmin,
};
