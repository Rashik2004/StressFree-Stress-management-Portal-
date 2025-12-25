const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false, // Don't return password by default
  },
  // Personalization Fields (Section 2.1)
  dob: {
    type: Date,
    required: false,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-binary", "Prefer not to say", "Other"],
    required: false,
  },
  stressTriggers: [
    {
      type: String,
    },
  ],
  relaxationMethods: [
    {
      type: String,

    },
  ],
  hasCompletedOnboarding: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  moodLogs: [
    {
      mood: String,
      stress: Number,
      note: String,
      date: { type: Date, default: Date.now },
    },
  ],
  meditationHistory: [
    {
      session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MeditationSession",
      },
      duration: Number, // Seconds
      completedAt: { type: Date, default: Date.now },
    },
  ],
  schedule: [
    {
      title: String,
      time: String,
      completed: { type: Boolean, default: false },
      day: String,
      meditationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MeditationSession",
      },
    },
  ],
  assessmentResults: {
    stressScore: Number,
    archetype: String,
    lastTaken: Date,
  },
  stats: {
    totalMinutes: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    lastMeditated: { type: Date },
  },
});

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
