import mongoose from "mongoose";

const objectiveSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  status:      { type: String, enum: ["To Do", "In Progress", "Done"], default: "To Do" },
  quest:       { type: mongoose.Schema.Types.ObjectId, ref: "Quest", required: true },
  xpReward:    { type: Number, default: 200 },
  completedAt: Date,
  quest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quest",
    required: true,
  },
});

const Objective = mongoose.model("Objective", objectiveSchema);
export default Objective;
