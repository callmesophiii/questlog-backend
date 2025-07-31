import Hero from "../models/Hero.js";
import jwt from "jsonwebtoken";

const generateToken = (hero) => {
  return jwt.sign({ id: hero._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const register = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;
    const hero = await Hero.create({ username, email, password, avatar });
    const token = generateToken(hero);
    res.status(201).json({
      token,
      hero: {
        _id: hero._id,
        username: hero.username,
        xp: hero.xp,
        level: hero.level,
        avatar: hero.avatar,
      },
    });
  } catch (err) {
    res.status(400).json({ error: "Registration failed." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hero = await Hero.findOne({ email });
    if (!hero || !(await hero.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const token = generateToken(hero);
    res.json({
      token,
      hero: {
        _id: hero._id,
        username: hero.username,
        xp: hero.xp,
        level: hero.level,
        avatar: hero.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed." });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const hero = await Hero.findById(req.hero._id);
    if (!hero) return res.status(404).json({ error: "Hero not found." });

    hero.avatar = req.body.avatar;
    await hero.save();

    res.json({
      message: "Avatar updated!",
      hero: {
        _id: hero._id,
        username: hero.username,
        xp: hero.xp,
        level: hero.level,
        avatar: hero.avatar,
      },
    });
  } catch (err) {
    console.error("Failed to update avatar:", err);
    res.status(500).json({ error: "Failed to update avatar." });
  }
};
