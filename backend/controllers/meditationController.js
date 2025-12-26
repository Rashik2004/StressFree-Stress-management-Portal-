const asyncHandler = require("express-async-handler");
const MeditationCategory = require("../models/MeditationCategory");
const MeditationSession = require("../models/MeditationSession");

// @desc    Get all meditation categories
// @route   GET /api/meditations/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await MeditationCategory.find({});
  res.status(200).json(categories);
});

// @desc    Get single category with sessions
// @route   GET /api/meditations/category/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await MeditationCategory.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  const sessions = await MeditationSession.find({
    category: req.params.id,
  }).sort("order");

  res.status(200).json({ ...category.toObject(), sessions });
});

// @desc    Get single session details
// @route   GET /api/meditations/session/:id
// @access  Public
const getSessionById = asyncHandler(async (req, res) => {
  const session = await MeditationSession.findById(req.params.id).populate(
    "category"
  );

  if (!session) {
    res.status(404);
    throw new Error("Session not found");
  }

  res.status(200).json(session);
});

// @desc    Get sessions by tag (Situation)
// @route   GET /api/meditations/tag/:tag
// @access  Public
const getSessionsByTag = asyncHandler(async (req, res) => {
  const tag = req.params.tag.toLowerCase(); // Ensure case-insensitive matching

  // Find sessions where the tags array contains the requested tag (regex for partial match or exact?)
  // Using exact match but case insensitive logic inside DB query is better if possible,
  // but for now simple 'in' query works if tags are normalized.

  // Let's assume tags in DB are lowercase.
  const sessions = await MeditationSession.find({
    tags: { $in: [new RegExp(`^${tag}$`, "i")] },
  });

  // We might want to construct a "fake" category object to reuse the frontend UI
  // or just send sessions and let frontend handle the title.
  // Sending a wrapper object matches the category endpoint structure slightly.

  res.status(200).json({
    _id: "tag-" + tag,
    title: tag.charAt(0).toUpperCase() + tag.slice(1) + " Meditations",
    description: `Curated sessions for ${tag}`,
    sessions,
  });
});

// @desc    Search sessions by keyword
// @route   GET /api/meditations/search?query=...
// @access  Public
const searchSessions = asyncHandler(async (req, res) => {
  const keyword = req.query.query;

  if (!keyword) {
    res.status(400);
    throw new Error("Search query required");
  }

  const keywordRegex = new RegExp(keyword, "i");

  const sessions = await MeditationSession.find({
    $or: [{ title: keywordRegex }, { tags: keywordRegex }],
  });

  res.status(200).json(sessions);
});

module.exports = {
  getCategories,
  getCategoryById,
  getSessionById,
  getSessionsByTag,
  searchSessions,
};
