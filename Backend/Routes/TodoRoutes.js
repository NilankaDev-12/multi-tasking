import { Router } from "express";
import {
  createTodo,
  deleteAllTodo,
  deleteSingleTodo,
  getAllTodo,
  getSingleTodo,
  updateTodo,
} from "../Controllers/TodoController.js";

const router = Router();

router.get("/getAllTodo", getAllTodo);

router.get("/getSingleTodo/:id", getSingleTodo);

router.post("/createTodo", createTodo);

router.put("/updateTodo/:id", updateTodo);

router.delete("/deleteSingleTodo/:id", deleteSingleTodo);

router.delete("/deleteAllTodo", deleteAllTodo);

export default router;
