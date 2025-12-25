const express = require("express");
const router = express.Router();
const {
  getDashboardData,
  logMood,
  getSchedule,
  updateStats,
  addScheduleItem,
  deleteScheduleItem,
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getDashboardData);
router.post("/mood", protect, logMood);
router.get("/schedule", protect, getSchedule);
router.post("/stats", protect, updateStats);
router.post("/schedule", protect, addScheduleItem);
router.delete("/schedule/:itemId", protect, deleteScheduleItem);

module.exports = router;
