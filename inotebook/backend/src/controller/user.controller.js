import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { validationResult } from "express-validator";
import User from "../model/user.model.js";

const options = {
  httpOnly: true,
  secure: true,
};

const registerUser = asyncHandler(async (req, res) => {
  // if there are errors then return bad requests of error
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check whether the user with same email exists already
  try {
    let { name, email, password } = req.body;

    let doesExistedUser = await User.findOne({ email });

    if (doesExistedUser) {
      throw new apiError(400, "Email is already being used");
    }

    //To send userInfo to mongoDB to create user
    const user = await User.create({
      name,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select("-password -__v");

    return res
      .status(201)
      .json(new apiResponse(201, createdUser, "User created successfully!"));
  } catch (error) {
    throw new apiError(
      error.statusCode || 500,
      error.message || "Internal server error while  registering user!"
    );
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      throw new apiError(400, "User does not exists!");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw new apiError(400, "Password is incorrect!");
    }

    const accessToken = user.generateAccessToken();

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(new apiResponse(200, accessToken, "User logged in successfully!"));
  } catch (error) {
    throw new apiError(
      error.statusCode || 500,
      error.message || "Internal server error while logging in user!"
    );
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .json(new apiResponse(200, {}, "Logged out successfully!"));
  } catch (error) {
    throw new apiError(
      error.statusCode || 500,
      error.message || "Internal server error while logging out user!"
    );
  }
});

const getUserDetails = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password -__v");
    return res
      .status(200)
      .json(new apiResponse(200, user, "User details fetched successfully!"));
  } catch (error) {
    throw new apiError(
      error.statusCode || 500,
      error.message || "Internal server error while fetching user details!!"
    );
  }
});

const changePassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    //   if (oldPassword !== newPassword) {
    //     throw new apiError(400, "Old and New password are not same!");
    //   }

    const user = await User.findById(req.user._id);

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
      throw new apiError(400, "Password is incorrect!");
    }

    user.password = newPassword;

    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new apiResponse(200, {}, "Password changed successfully!"));
  } catch (error) {
    throw new apiError(
      error.statusCode || 500,
      error.message || "Internal server error while changing password!"
    );
  }
});

const changeUserDetails = asyncHandler(async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { name, email } },
      { new: true }
    ).select("-password -__v");

    return res
      .status(200)
      .json(new apiResponse(200, user, "User details changed successfully!"));
  } catch (error) {
    throw new apiError(
      error.statusCode || 500,
      error.message || "Internal server error while changing user details!"
    );
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  changePassword,
  changeUserDetails,
};
