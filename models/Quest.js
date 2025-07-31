import mongoose from "mongoose";

const questSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: "Hero", required: true },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hero" }]
}, { timestamps: true });

const Quest = mongoose.model("Quest", questSchema);
export default Quest;
