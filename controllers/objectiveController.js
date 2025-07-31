import Objective from "../models/Objective.js";
import Quest from "../models/Quest.js";
import Hero from "../models/Hero.js";

const XP_TO_LEVEL_UP = 1000;

// 🔐 Reusable check: is hero owner or collaborator?
const isMemberOfQuest = async (heroId, questId) => {
  const quest = await Quest.findById(questId);
  return quest &&
    (quest.owner.equals(heroId) || quest.collaborators.includes(heroId));
};

// GET all objectives in a quest
export const getObjectives = async (req, res) => {
  const authorized = await isMemberOfQuest(req.hero._id, req.params.questId);
  if (!authorized) return res.status(403).json({ error: "Not authorized." });

  const objectives = await Objective.find({ quest: req.params.questId });
  res.json(objectives);
};

// CREATE a new objective
export const createObjective = async (req, res) => {
  const authorized = await isMemberOfQuest(req.hero._id, req.params.questId);
  if (!authorized) return res.status(403).json({ error: "Not authorized." });

  const objective = await Objective.create({ ...req.body, quest: req.params.questId });
  res.status(201).json(objective);
};

// UPDATE an objective
export const updateObjective = async (req, res) => {
  const objective = await Objective.findById(req.params.objectiveId);
  if (!objective) return res.status(404).json({ error: "Objective not found." });

  const authorized = await isMemberOfQuest(req.hero._id, objective.quest);
  if (!authorized) return res.status(403).json({ error: "Not authorized." });

  const wasDone = objective.status === "Done";
  const becomingDone = req.body.status === "Done";

  // Update fields
  objective.title = req.body.title ?? objective.title;
  objective.description = req.body.description ?? objective.description;
  objective.status = req.body.status ?? objective.status;
  objective.xpReward = req.body.xpReward ?? objective.xpReward ?? 200;

  // Award XP if status changed to Done
  if (!wasDone && becomingDone) {
    objective.completedAt = new Date();

    const hero = await Hero.findById(req.hero._id);
    hero.xp += objective.xpReward;

    while (hero.xp >= XP_TO_LEVEL_UP) {
      hero.level += 1;
      hero.xp -= XP_TO_LEVEL_UP;
    }

    await hero.save();
  }

  await objective.save();
  res.json(objective);
};

// DELETE an objective
export const deleteObjective = async (req, res) => {
  const objective = await Objective.findById(req.params.objectiveId);
  if (!objective) return res.status(404).json({ error: "Objective not found." });

  const authorized = await isMemberOfQuest(req.hero._id, objective.quest);
  if (!authorized) return res.status(403).json({ error: "Not authorized." });

  await objective.deleteOne();
  res.json({ message: "Objective deleted." });
};
