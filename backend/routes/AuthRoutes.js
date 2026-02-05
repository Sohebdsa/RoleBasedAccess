import express from "express";
import {
    register,
    login,
    refreshToken,
    getCurrentUser,
} from "../controllers/AuthController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);

// Protected routes
router.get("/me", authenticateToken, getCurrentUser);

export default router;
