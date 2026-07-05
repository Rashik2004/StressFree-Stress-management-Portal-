const express = require("express");
const router = express.Router();
const {
  getTestimonials,
  createTestimonial,
  getFAQs,
  getFeatures,
} = require("../controllers/contentController");
const { protect } = require("../middleware/authMiddleware");

router.get("/testimonials", getTestimonials);
router.post("/testimonials", protect, createTestimonial);
router.get("/faqs", getFAQs);
router.get("/features", getFeatures);

module.exports = router;
