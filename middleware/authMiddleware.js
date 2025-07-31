import jwt from "jsonwebtoken";
import Hero from "../models/Hero.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.hero = await Hero.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
