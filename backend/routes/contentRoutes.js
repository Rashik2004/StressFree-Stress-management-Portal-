const express = require("express");
const router = express.Router();
const {
  getTestimonials,
  createTestimonial,
  getFAQs,
  getFeatures,
} = require("../controllers/contentController");

router.get("/testimonials", getTestimonials);
router.post("/testimonials", createTestimonial);
router.get("/faqs", getFAQs);
router.get("/features", getFeatures);

module.exports = router;
