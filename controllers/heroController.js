import Hero from "../models/Hero.js";

export const getProfile = async (req, res) => {
  try {
    const hero = await Hero.findById(req.hero._id).select("-password");
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile." });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const hero = await Hero.findById(req.hero._id);
    if (!hero) {
      return res.status(404).json({ error: "Hero not found." });
    }
    hero.avatar = avatar;
    await hero.save();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: "Failed to update avatar." });
  }
};

