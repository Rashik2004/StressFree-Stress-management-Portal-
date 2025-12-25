const asyncHandler = require("express-async-handler");
const Testimonial = require("../models/Testimonial");
const FAQ = require("../models/FAQ");
const Feature = require("../models/Feature");

// @desc    Get all active testimonials
// @route   GET /api/content/testimonials
// @access  Public
// @desc    Get all active testimonials
// @route   GET /api/content/testimonials
// @access  Public
const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ isActive: true }).sort({
    createdAt: -1,
  });
  res.status(200).json(testimonials);
});

// @desc    Submit a new testimonial
// @route   POST /api/content/testimonials
// @access  Private
const createTestimonial = asyncHandler(async (req, res) => {
  const { name, role, quote, rating, image } = req.body;

  if (!name || !role || !quote || !rating) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const testimonial = await Testimonial.create({
    name,
    role,
    quote,
    rating,
    color: "bg-surface", // Default color
    image:
      image ||
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Default placeholder
    isActive: true, // Auto-approve for now
  });

  res.status(201).json(testimonial);
});

// @desc    Get all active FAQs
// @route   GET /api/content/faqs
// @access  Public
const getFAQs = asyncHandler(async (req, res) => {
  const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 });
  res.status(200).json(faqs);
});

// @desc    Get all active features
// @route   GET /api/content/features
// @access  Public
const getFeatures = asyncHandler(async (req, res) => {
  const features = await Feature.find({ isActive: true }).sort({ order: 1 });
  res.status(200).json(features);
});

module.exports = {
  getTestimonials,
  createTestimonial,
  getFAQs,
  getFeatures,
};
