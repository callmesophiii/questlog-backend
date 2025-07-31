import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getQuests,
  getQuestById,
  createQuest,
  updateQuest,
  deleteQuest,
  joinQuest,
  inviteCollaborator
} from "../controllers/questController.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getQuests).post(createQuest);
router.route("/:id").get(getQuestById).put(updateQuest).delete(deleteQuest);
router.put("/:id/join", joinQuest);
router.put("/:id/invite", inviteCollaborator);

export default router;
