const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    iconName: {
      type: String,
      required: true, // e.g., 'Brain', 'Trophy' - mapped on frontend
    },
    color: {
      type: String,
      required: true, // Tailwind class for background
    },
    textColor: {
      type: String,
      required: true,
    },
    ctaText: {
      type: String,
    },
    statText: {
      type: String,
    },
    quickStats: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feature", featureSchema);
