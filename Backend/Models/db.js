import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongo_url = process.env.MONGO_URL;
    await mongoose.connect(mongo_url);
    console.log("✅ MongoDB connected...");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}