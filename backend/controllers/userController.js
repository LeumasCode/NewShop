import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//@DESC  Auth User and get Token
//@route POST api/users/login
//@access PUBLIC

export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if(!user) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  user = (user && await(user.comparePassword(password)))

  res.status(200).json({ 
      status: 'success',
      user

  });
});
