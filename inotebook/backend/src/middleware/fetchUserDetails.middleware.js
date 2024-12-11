import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";

const fetchUserDetails = (req, res, next) => {
  //Get user from jwt token and add id to the req object
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(400).json(new apiResponse(400, {}, "Token not Found!"));
    // throw new apiError(400, "Authentication Failed!");
  }
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!user) {
      return res
        .status(401)
        .json(new apiResponse(401, {}, "Unauthorised request!"));
      // throw new apiError(400, "Unauthorised request!");
    }

    //jsonwebtoken will return an object after successful verification
    req.user = user;
    next();
  } catch (error) {
    throw new apiError(
      error.statusCode || 500,
      error.message || "Internal server error while fetching user!"
    );
  }
};
export { fetchUserDetails };
