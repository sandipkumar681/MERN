import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
// const mongoURI = "mongodb://localhost:27017/iNoteBook";
const connectToMongo = async () => {
  try {
    // await mongoose.connect(process.env.mongoURI);
    await mongoose.connect(`${process.env.mongoURI}/${DB_NAME}`);
    // await mongoose.connect("mongodb://localhost:27017/iNoteBook");
    console.log("Connected to mongoDB successfully");
  } catch (error) {
    console.error("ERROR: ", error);
    process.exit(1);
  }
};

export default connectToMongo;
