const mongoose = require("mongoose");

const meditationSessionSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MeditationCategory",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // in seconds
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    instructions: [
      {
        type: String,
        required: true,
      },
    ],
    audioUrl: {
      type: String, // Optional URL to audio file
    },
    tags: [
      {
        type: String,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MeditationSession", meditationSessionSchema);
