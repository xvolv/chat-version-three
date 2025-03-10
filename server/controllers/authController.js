const User = require("./../models/userModel");
const customError = require("./../utils/customeError");
const asyncErrorHandler = require("./asyncErrorHandler");
const jwt = require("jsonwebtoken");

const tokenGenerete = (id) => {
  return jwt.sign({ id }, process.env.SEC_KEY, {
    expiresIn: "1d",
  });
};

exports.signup = asyncErrorHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, profile } = req.body;

  // Validate required fields (schema wilatch most of this)
  if (!firstName || !lastName || !email || !password) {
    return next(new customError("Please provide all required fields", 400));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new customError("Email already exists", 400));
  }

  // Create new user (password hashed by schema)
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    profile,
  });

  const token = tokenGenerete(user._id);
  res.status(201).json({
    status: "SUCCESS",
    message: "USER SIGNUP SUCCESSFULLY",
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profile: user.profile,
    },
  });
});

exports.login = asyncErrorHandler(async (req, res, next) => {
  //find the user by email
  const { email, password } = req.body;
  if (!email || !password) {
    const error = new customError("PROVIDE BOTH EMAIL AND PASSWORD", 400);
    return next(error);
  }
  // find the user in the database
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user) {
    const error = new customError(
      "THERE IS NO USER WITH THE PROVIDED EMAIL",
      404
    );
    return next(error);
  }

  //check password
  const match = await user.matchPassword(req.body.password, user.password);
  if (!match) {
    return next(new customError("INCORRECT PASSWORD ", 401));
  }
  const token = tokenGenerete(user._id);
  res.status(200).json({
    status: "SUCCESS",
    message: "logged in",
    token,
  });
});

exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find({});
  console.log(users);
  res.status(200).json({
    status: "SUCCESS",
    users,
  });
});
exports.getOtherUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find({ id: { $ne: req.user._id } });
  console.log(users);
  res.status(200).json({
    status: "SUCCESS",
    users,
  });
});
exports.loggerDetail = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id); // Corrected here

  if (!user) {
    return next(new customError("User not found", 404));
  }

  res.status(200).json({
    status: "SUCCESS",
    user, // Now it's an object, not an array
  });
});
