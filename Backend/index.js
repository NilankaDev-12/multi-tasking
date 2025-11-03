import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  authRouter,
  todoRouter,
  expenseRouter,
  savingRouter,
} from "./Routes/index.js";
import { connectDB } from "./Models/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Allow both local & deployed frontend
const allowedOrigins = [
  "https://nilanka-multi-tasking.netlify.app",
  "http://localhost:5173", // for local testing
];

app.use(express.json());
app.use(cookieParser());

app.set("trust proxy", 1); // ✅ Required for Render (HTTPS proxy)

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/savings", savingRouter);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (error) {
    console.error("Internal error. Server didn't start", error);
  }
});
