import { Router } from "express";
import { createExpense, deleteAllExpenses, deleteSingleExpense, getAllExpenses, getSingleExpense, updateExpense } from "../Controllers/ExpenseController.js";
const router = Router();

router.get("/getSingleExpense/:id", getSingleExpense)

router.get("/getAllExpenses", getAllExpenses)

router.post("/createExpense", createExpense)

router.put("/updateExpense/:id", updateExpense)

router.delete("/deleteSingleExpense/:id", deleteSingleExpense)

router.delete("/deleteAllExpenses", deleteAllExpenses)

export default router;