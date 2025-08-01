import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import questRoutes from "./routes/questRoutes.js";
import objectiveRoutes from "./routes/objectiveRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static avatars
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/avatars", express.static(path.join(__dirname, "public", "avatars")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/quests/:questId/objectives", objectiveRoutes);
app.use("/api/heroes", heroRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('QuestLog API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`⚔️  QuestLog backend running on port ${PORT}`));

