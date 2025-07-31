import Quest from "../models/Quest.js";
import Hero from "../models/Hero.js";

// GET all quests for the logged-in hero
export const getQuests = async (req, res) => {
  const quests = await Quest.find({
    $or: [
      { owner: req.hero._id },
      { collaborators: req.hero._id }
    ]
  })
    .populate("owner", "username")
    .populate("collaborators", "username avatar");

  res.json(quests);
};

// GET a single quest by ID
export const getQuestById = async (req, res) => {
  const quest = await Quest.findById(req.params.id)
    .populate("owner", "username")
    .populate("collaborators", "username avatar");

  if (
    !quest ||
    (!quest.owner.equals(req.hero._id) &&
     !quest.collaborators.some(c => c.equals(req.hero._id)))
  ) {
    return res.status(403).json({ error: "Not authorized to view this quest." });
  }

  res.json(quest);

  // Optional: restrict access to members
  const isAuthorized =
    quest.owner._id.equals(req.hero._id) ||
    quest.collaborators.some((c) => c._id.equals(req.hero._id));

  if (!isAuthorized) {
    return res.status(403).json({ error: "Not authorized to view this quest." });
  }

  res.json(quest);
};

// CREATE a new quest
export const createQuest = async (req, res) => {
  const quest = await Quest.create({
    title: req.body.title,
    description: req.body.description,
    owner: req.hero._id
  });
  res.status(201).json(quest);
};


// UPDATE a quest
export const updateQuest = async (req, res) => {
  const quest = await Quest.findOneAndUpdate(
    { _id: req.params.id, owner: req.hero._id },
    req.body,
    { new: true }
  );
  if (!quest) return res.status(404).json({ error: "Quest not found." });
  res.json(quest);
};

// DELETE a quest
export const deleteQuest = async (req, res) => {
  const quest = await Quest.findOneAndDelete({ _id: req.params.id, owner: req.hero._id });
  if (!quest) return res.status(404).json({ error: "Quest not found." });
  res.json({ message: "Quest deleted." });
};

// JOIN a quest
export const joinQuest = async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) return res.status(404).json({ error: "Quest not found." });

    if (quest.collaborators.includes(req.hero._id)) {
      return res.status(400).json({ error: "You are already part of this quest." });
    }

    quest.collaborators.push(req.hero._id);
    await quest.save();

    const updatedQuest = await Quest.findById(quest._id)
      .populate("collaborators", "username avatar")
      .populate("owner", "username");

    res.json({ message: "Successfully joined the quest.", quest: updatedQuest });
  } catch (error) {
    console.error("Error joining quest:", error);
    res.status(500).json({ error: "Failed to join quest." });
  }
};

// Invite a user on the quest
export const inviteCollaborator = async (req, res) => {
  try {
    const { username } = req.body;
    
    const quest = await Quest.findById(req.params.id);
    if (!quest) return res.status(404).json({ error: "Quest not found." });

    const heroToInvite = await Hero.findOne({ username });
    if (!heroToInvite) return res.status(404).json({ error: "User not found." });

    // Only owner or other collaborators can invite
    const isAuthorized = quest.owner.equals(req.hero._id) || quest.collaborators.includes(req.hero._id);
    if (!isAuthorized) return res.status(403).json({ error: "Not authorized to invite." });

    // Prevent duplicate invites
    if (
      quest.owner.equals(heroToInvite._id) ||
      quest.collaborators.includes(heroToInvite._id)
    ) {
      return res.status(400).json({ error: "Hero already part of the quest." });
    }

    quest.collaborators.push(heroToInvite._id);
    await quest.save();

    res.json({ message: "Hero successfully added to quest.", quest });
  } catch (error) {
    console.error("Invite error:", error);
    res.status(500).json({ error: "Server error inviting hero." });
  }
};
