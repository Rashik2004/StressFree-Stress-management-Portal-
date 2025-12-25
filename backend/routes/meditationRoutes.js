const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  getSessionById,
} = require("../controllers/meditationController");

router.get("/categories", getCategories);
router.get("/category/:id", getCategoryById);
router.get("/session/:id", getSessionById);
router.get(
  "/tag/:tag",
  require("../controllers/meditationController").getSessionsByTag
);

module.exports = router;
