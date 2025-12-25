const express = require("express");
const router = express.Router();
const {
  submitAssessment,
  chatResponse,
} = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

router.post("/assess", protect, submitAssessment);
router.post("/chat", protect, chatResponse);

module.exports = router;
