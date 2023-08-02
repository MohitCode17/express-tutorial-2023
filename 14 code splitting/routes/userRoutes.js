import express from "express";
import {
  getAllUsers,
  getUserById,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

// Routes:-
// Get all users api
router.get("/allusers", getAllUsers);

// Register user api
router.post("/register", registerUser);

// Get user by id
router.get("/user/:id", getUserById);

export default router;
