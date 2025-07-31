import mongoose from "mongoose";
import bcrypt from "bcrypt";

const heroSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    class:     { type: String, default: "Adventurer" },
    hairColor: { type: String, default: "Black" },
    weapon:    { type: String, default: "Sword" }
  },
  xp:    { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  party: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hero" }]
}, { timestamps: true });

heroSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

heroSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Hero = mongoose.model("Hero", heroSchema);
export default Hero;
