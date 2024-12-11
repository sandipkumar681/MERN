import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectToMongo = async () => {
  try {
    await mongoose.connect(`${process.env.MONGOURI}/${DB_NAME}`);
    console.log("Connected to mongoDB successfully");
  } catch (error) {
    console.error("ERROR: ", error);
    process.exit(1);
  }
};

export default connectToMongo;
