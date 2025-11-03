import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter, todoRouter, expenseRouter,savingRouter } from "./Routes/index.js";
import { connectDB } from "./Models/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}));

app.use("/api/auth",authRouter);
app.use("/api/todo",todoRouter);
app.use("/api/expense",expenseRouter);
app.use("/api/savings",savingRouter);

app.listen(PORT,async ()=>{
  try {
    await connectDB();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log("Internal error. Server didn't start");
  }
})