import User from "../modals/userModal.js";
import asyncHandler from "../middleware/async.js";
import signToken from "../utils/jsonToken.js";

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPasswords(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: signToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("inValid Email or Password");
  }
});

//Get current user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

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
  const users = await User.find({});
  res.json(users);
});
//Create a New User
const createANewUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(401);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
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
  const { name, email, password } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
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
  const user = await User.findById(req.params.id);

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
