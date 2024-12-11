import express from "express";
import { body } from "express-validator";
import { fetchUserDetails } from "../middleware/fetchUserDetails.middleware.js";
const router = express.Router();

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  changePassword,
  changeUserDetails,
} from "../controller/user.controller.js";

// Route 1: Create an User using POST "/api/auth/createuser". No login required
router.post(
  "/registeruser",
  [
    //To check if req.body is of proper type
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  registerUser
);

// Route 2: Login an User using POST "/api/auth/loginuser".Login required
router.post(
  "/loginuser",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  loginUser
);

router.get("/logoutuser", fetchUserDetails, logoutUser);

// Route 3: Fetch an User's Details using POST "/api/auth/getuserdetails".Login required

router.get("/getuserdetails", fetchUserDetails, getUserDetails);

router.patch("/change-password", fetchUserDetails, changePassword);

router.patch("/change-user-details", fetchUserDetails, changeUserDetails);

export default router;
