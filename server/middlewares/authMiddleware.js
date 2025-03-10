const customeError = require("./../utils/customeError");
const asyncErrorHandler = require("./../controllers/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

const protectRoute = asyncErrorHandler(async (req, res, next) => {
  // 1. Check token presence and format
  const tokenToVerify = req.headers.authorization;
  if (!tokenToVerify) {
    return next(new customeError("Please login", 401));
  }
  if (!tokenToVerify.startsWith("Bearer ")) {
    return next(new customeError("Wrong token format, use Bearer", 401));
  }

  // 2. Extract and verify token
  const token = tokenToVerify.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SEC_KEY);

  // 3. Verify user exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new customeError("User no longer exists, please sign up", 404));
  }

  // 4. Attach user to request
  req.user = user;

  next();
});

module.exports = protectRoute;
