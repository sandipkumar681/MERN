import jwt from "jsonwebtoken";
const JWT_SECRET = "myJWTSecret";

const fetchUser = (req, res, next) => {
  //Get user from jwt token and add id to the req object
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Authentication failed" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    // const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);

    //jsonwebtoken will return an object after successful verification
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).send({ error: "fetchUser error occured" });
  }
};
export default fetchUser;
