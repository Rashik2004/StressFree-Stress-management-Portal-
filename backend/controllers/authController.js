const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    dob,
    gender,
    stressTriggers,
    relaxationMethods,
  } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    dob,
    gender,
    stressTriggers: stressTriggers || [],
    relaxationMethods: relaxationMethods || [],
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      hasCompletedOnboarding: user.hasCompletedOnboarding,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      // Return personalization data if available, helpful for frontend state
      dob: user.dob,
      gender: user.gender,
      profilePicture: user.profilePicture,
      stressTriggers: user.stressTriggers,
      relaxationMethods: user.relaxationMethods,
      hasCompletedOnboarding: user.hasCompletedOnboarding,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    dob: user.dob,
    gender: user.gender,
    profilePicture: user.profilePicture,
    stressTriggers: user.stressTriggers,
    relaxationMethods: user.relaxationMethods,
    hasCompletedOnboarding: user.hasCompletedOnboarding,
  });
});

// @desc    Update user profile (Onboarding)
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.stressTriggers = req.body.stressTriggers || user.stressTriggers;
    user.relaxationMethods =
      req.body.relaxationMethods || user.relaxationMethods;
    user.sleepHours = req.body.sleepHours || user.sleepHours;
    user.meditationExperience =
      req.body.meditationExperience || user.meditationExperience;
    user.dob = req.body.dob || user.dob;
    user.gender = req.body.gender || user.gender;
    user.profilePicture = req.body.profilePicture || user.profilePicture;

    // If we receive data, mark onboarding as complete
    if (
      req.body.stressTriggers ||
      req.body.relaxationMethods ||
      req.body.sleepHours ||
      req.body.meditationExperience
    ) {
      user.hasCompletedOnboarding = true;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      dob: updatedUser.dob,
      gender: updatedUser.gender,
      profilePicture: updatedUser.profilePicture,
      stressTriggers: updatedUser.stressTriggers,
      relaxationMethods: updatedUser.relaxationMethods,
      token: generateToken(updatedUser._id), // Optional: refresh token
      hasCompletedOnboarding: updatedUser.hasCompletedOnboarding,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
};
