import bcrypt from "bcryptjs";
import UserModel from "../Models/User.js";
import { generateToken, verifyToken } from "../utils/TokenTask.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    const userModel = new UserModel({ email, name, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errorMsg = "Auth failed, email or password is wrong";

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: errorMsg,
        success: false,
      });
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(401).json({
        message: errorMsg,
        success: false,
      });
    }

    const token = generateToken({ email });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.status(200).json({
      message: "Login successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const protectedRoute = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "No token found",
      success: false,
    });
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    res.json({ email: decoded.email });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
