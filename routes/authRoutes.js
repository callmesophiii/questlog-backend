import express from "express";
import { register, login, updateAvatar } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/avatar", protect, updateAvatar);

export default router;
