const mongoose = require("mongoose");

const meditationCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bestFor: {
      type: String,
      required: true,
    },
    durationRange: {
      type: String,
      required: true,
    },
    iconName: {
      type: String, // 'Brain', 'Wind', etc.
      required: true,
    },
    color: {
      type: String, // Tailwind class for background
      required: true,
    },
    textColor: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MeditationCategory", meditationCategorySchema);
