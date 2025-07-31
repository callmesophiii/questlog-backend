import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getProfile, updateAvatar } from "../controllers/heroController.js";

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/avatar", protect, updateAvatar);

export default router;