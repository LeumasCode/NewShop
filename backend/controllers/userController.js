import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@DESC  Auth User and get Token
//@route POST api/users/login
//@access PUBLIC

export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    res.status(401);
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email }).select("+password");

  console.log(await user.comparePassword(password));

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);

  res.status(200).json({
    user,
    token,
  });
});

//@DESC  Register a new User and get Token
//@route POST api/users
//@access PUBLIC

export const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body;

  // 1) Check if email and password exist
  if (!email || !password || !name) {
    res.status(401);
    throw new Error("Please provide name, email and password");
  }

  // check if user exist
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  // create a new User
  const user = await User.create(req.body);
  // generate token
  const token = generateToken(user._id);

  res.status(201).json({
    status: "success",
    user,
    token,
  });
});

//@DESC  Get User Profile
//@route GET api/users/profile
//@access Private

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

//@DESC  UPDATE User Profile
//@route PATCH api/users/profile
//@access Private

export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.password = req.body.password || user.password;

  const updatedUser = await user.save();

  res.status(200).json({
    updatedUser,
  });
});
