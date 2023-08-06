import express from "express";
import {
  addTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controller/taskController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/addTask", isAuthenticated, addTask);
router.get("/getTasks", isAuthenticated, getTask);
router.put("/updateTask/:id", isAuthenticated, updateTask);
router.delete("/deleteTask/:id", isAuthenticated, deleteTask);

export default router;
