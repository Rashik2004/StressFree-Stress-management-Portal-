const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  getSessionById,
  searchSessions, // Import the new controller
} = require("../controllers/meditationController");

router.get("/categories", getCategories);
router.get("/search", searchSessions); // Add search route BEFORE dynamic routes like :id
router.get("/category/:id", getCategoryById);
router.get("/session/:id", getSessionById);
router.get(
  "/tag/:tag",
  require("../controllers/meditationController").getSessionsByTag
);

module.exports = router;
