import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import questRoutes from "./routes/questRoutes.js";
import objectiveRoutes from "./routes/objectiveRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();
connectDB();

const app = express();

// ✅ Setup correct CORS for credentials
const allowedOrigins = [
  "http://localhost:5173",
  "https://questlog-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ Static avatar path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/avatars", express.static(path.join(__dirname, "public", "avatars")));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/quests/:questId/objectives", objectiveRoutes);
app.use("/api/heroes", heroRoutes);

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("QuestLog API is running");
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`⚔️  QuestLog backend running on port ${PORT}`)
);
