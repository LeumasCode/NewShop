import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//@DESC  Auth User and get Token
//@route POST api/users/login
//@access PUBLIC

export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  res.status(200).json({email, password})
});
