import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connected successfully");
};

export default connectDB;
