import mongoose from "mongoose";
const mongoURI = "mongodb://localhost:27017/iNoteBook";
const connectToMongo = async () => {
  try {
    // await mongoose.connect(process.env.mongoURI);
    await mongoose.connect(mongoURI);
    console.log("Connected to mongoDB successfully");
  } catch (error) {
    console.error("ERROR: ", error);
    process.exit(1);
  }
};

export default connectToMongo;
