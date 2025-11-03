import { Router } from "express";
import { getSingleSaving, getAllSavings, createSaving, updateSaving, deleteSingleSaving, deleteAllSavings } from "../Controllers/SavingController.js";

const router = Router();

router.get("/getSingleSaving/:id", getSingleSaving)

router.get("/getAllSavings", getAllSavings)

router.post("/createSavings", createSaving)

router.put("/updateSavings/:id", updateSaving)

router.delete("/deleteSingleSavings/:id", deleteSingleSaving)

router.delete("/deleteAllSavings", deleteAllSavings)

export default router;