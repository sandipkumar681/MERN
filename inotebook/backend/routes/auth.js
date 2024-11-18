import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchUser from "../middleware/fetchUser.js";
const router = express.Router();
const JWT_SECRET = "myJWTSecret";

// Route 1: Create an User using POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    //To check if req.body is of proper type
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // if there are errors then return bad requests of error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with same email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email is already being used" });
      }

      const salt = await bcypt.genSalt(10);
      const secPass = await bcypt.hash(req.body.password, salt);

      //To send userInfo to mongoDB to create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      return res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured!");
    }
  }
);

// Route 2: Login an User using POST "/api/auth/loginuser".Login required
router.post(
  "/loginuser",
  [
    body("password", "Password cannot be blank").exists(),
    body("email", "Enter a valid Email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        let returnsToF = await bcypt.compare(password, user.password);
        if (returnsToF) {
          // res.json([{ "message": " Email and Password are matched" }, { "canLogin": "yes" }]);
          const data = { id: user.id };
          const authToken = jwt.sign(data, JWT_SECRET);
          return res.json({ authToken });
        } else {
          return res
            .status(400)
            .json([{ message: "Password didn't match" }, { canLogin: "no" }]);
        }
      } else {
        return res
          .status(400)
          .json([
            { message: "Email doesn't exist.Please SignUp" },
            { canLogin: "no" },
          ]);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured!");
    }
  }
);

// Route 3: Fetch an User's Details using POST "/api/auth/getuser".Login required

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured!");
  }
});

export default router;
