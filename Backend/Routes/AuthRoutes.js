import { Router } from "express";
import {
  signupValidation,
  loginValidation,
} from "../Middlewares/AuthValidate.js";
import {
  login,
  logout,
  protectedRoute,
  signup,
} from "../Controllers/AuthController.js";

const router = Router();

router.post("/signup", signupValidation, signup);

router.post("/login", loginValidation, login);

router.get("/profile", protectedRoute);

router.post("/logout", logout);

export default router;
