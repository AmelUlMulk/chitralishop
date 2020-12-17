import jwt from "jsonwebtoken";
import User from "../modals/userModal.js";
import asyncHandler from "../middleware/async.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      token = req.headers.authorization.split(" ")[1];
      const jwtSecret = process.env.JWT_SECRET
      console.log(jwtSecret,token)
      const decoded = jwt.verify(token, jwtSecret);
      req.user = await User.findById(decoded.id).select("-password");
      
    } catch (error) {
      console.error(error);
      res.status(401);
    }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized by protect");
  }
  next();
});
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized by admin");
  }
};
export { protect, admin };
