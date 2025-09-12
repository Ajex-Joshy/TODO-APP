import express from "express";
import {
  addTask,
  editTask,
  deleteTask,
  completeTask,
  dashboard,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/dashboard", dashboard);
router.post("/add", addTask);
router.patch("/edit/:taskId", editTask);
router.delete("/delete/:taskId", deleteTask);
router.patch("/mark-as-complete/:taskId", completeTask);

export default router;
