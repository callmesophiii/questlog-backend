import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getObjectives,
  createObjective,
  updateObjective,
  deleteObjective,
} from "../controllers/objectiveController.js";

const router = express.Router({ mergeParams: true });

router.use(protect);
router.route("/").get(getObjectives).post(createObjective);
router.route("/:objectiveId").put(updateObjective).delete(deleteObjective);

export default router;
