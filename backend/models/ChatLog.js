const mongoose = require("mongoose");

const chatLogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
    sentiment: {
      type: String,
      enum: [
        "Greeting",
        "Identity",
        "Introversion",
        "Loneliness",
        "Tiredness",
        "Anxiety",
        "Work Stress",
        "Sadness",
        "Happiness",
        "Gratitude",
        "Anger",
        "Confusion",
        "Pain",
        "Grief",
        "Morning",
        "Advice",
        "Neutral",
      ],
      default: "Neutral",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ChatLog", chatLogSchema);
