import express from "express"
import { loginUser, logout, registerUser, userProfile } from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", isAuthenticated ,userProfile);
router.get("/logout", logout);

export default router;