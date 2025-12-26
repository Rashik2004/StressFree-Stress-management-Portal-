const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const MeditationSession = require("../models/MeditationSession");

// @desc    Submit Assessment & Generate Plan
// @route   POST /api/ai/assess
// @access  Private
const submitAssessment = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Calculate Stress Score (Heuristic Algorithm)
  let stressScore = 0;
  let archetype = "Balanced";

  // Simple sum logic if answers are 0-3 scale

  if (answers && Array.isArray(answers)) {
    const totalScore = answers.reduce(
      (acc, val) => acc + (Number(val) || 0),
      0
    );
    const maxScore = answers.length * 3; // Assuming 0-3 scale
    stressScore = Math.round((totalScore / maxScore) * 100);
  }

  // Determine Archetype given score range
  if (stressScore > 80) archetype = "The Burnout Warrior";
  else if (stressScore > 60) archetype = "The Overthinker";
  else if (stressScore > 40) archetype = "The Busy Bee";
  else archetype = "The Zen Master";

  // 3. Save Results
  user.assessmentResults = {
    stressScore,
    archetype,
    lastTaken: new Date(),
  };

  // Generate Personalized Plan based on Archetype
  let query = {};
  if (archetype === "The Burnout Warrior") query = { category: "Deep Rest" };
  else if (archetype === "The Overthinker") query = { category: "Anxiety" };
  else if (archetype === "The Busy Bee") query = { duration: { $lt: 600 } };

  const recommendedSessions = await MeditationSession.find(query).limit(5);

  // If we found nothing specific, get any 5
  let finalSessions = recommendedSessions;
  if (finalSessions.length < 3) {
    finalSessions = await MeditationSession.find({}).limit(5);
  }

  // Add to schedule for next 5 days
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  finalSessions.forEach((session, index) => {
    if (index < 5) {
      user.schedule.push({
        title: session.title,
        time: "08:00", // Default morning time
        day: days[index],
        meditationId: session._id,
        completed: false,
      });
    }
  });

  await user.save();

  res.status(200).json({
    stressScore,
    archetype,
    plan: user.schedule, // return updated schedule
  });
});

// @desc    Chat with AI (Rule-Based Simulation)
// @route   POST /api/ai/chat
// @access  Private
const chatResponse = asyncHandler(async (req, res) => {
  console.log("Chat Request Body:", req.body);
  console.log("Chat Request User ID:", req.user ? req.user.id : "NO_USER");

  const { message } = req.body;
  if (!message) {
    res.status(400);
    throw new Error("Message required");
  }
  let responseText = "";
  let suggestion = null;

  if (!req.user || !req.user.id) {
    res.status(401);
    throw new Error("User context missing in controller");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found in DB");
  }

  // Helper to pick random response
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const match = (patterns) =>
    patterns.some((p) => new RegExp(p, "i").test(message));

  if (match(["hello", "hi", "hey", "greetings"])) {
    responseText = pick([
      `Hello ${
        user.name ? user.name.split(" ")[0] : "Friend"
      }! I'm listening. How is your day going?`,
      `Hi there! I'm here for you. What's on your mind?`,
      `Greetings! I hope you're having a gentle day. How are you feeling?`,
    ]);
  } else if (match(["name", "who are you"])) {
    responseText =
      "I'm your AI stress companion. You can call me MindfulBot. I'm here to support you.";
  } else if (
    match([
      "introvert",
      "shy",
      "rigid",
      "quiet",
      "social anxiety",
      "awkward",
      "insecure",
    ])
  ) {
    responseText = pick([
      "Being an introvert is a strength, not a flaw. You don't need to change who you are to be worthy of friendship.",
      "It hurts when people judge our nature. Your quietness allows for deep thought and observation. Value that.",
      "There is nothing wrong with being selective socially. Quality matters more than quantity.",
    ]);
    suggestion = {
      title: "Self-Acceptance Flow",
      link: "/meditations/tag/healing",
    };
  } else if (
    match([
      "friend",
      "friends",
      "lonely",
      "alone",
      "ignored",
      "relationship",
      "breakup",
      "social",
    ])
  ) {
    responseText = pick([
      "Relationships can be complex. It sounds like you're feeling undervalued. Remember your worth isn't defined by others.",
      "Feeling ignored is incredibly painful. It often says more about them than you. How does this make you feel physically?",
      "Connection is a human need, but so is self-respect. You deserve people who answer back.",
    ]);
    suggestion = {
      title: "Loving Kindness Meditation",
      link: "/meditations/tag/loving-kindness",
    };
  } else if (match(["tired", "exhausted", "sleep", "insomnia", "drained"])) {
    responseText = pick([
      "It sounds like you're running on empty. Physical rest is just as important as mental effort.",
      "Your body is asking for a pause. Listening to it is an act of courage, not laziness.",
      "Exhaustion is a signal. Let's try to wind down gently.",
    ]);
    suggestion = {
      title: "Deep Sleep Release",
      link: "/meditations/tag/sleep",
    };
  } else if (
    match([
      "anxious",
      "panic",
      "worried",
      "nervous",
      "scared",
      "fear",
      "stress",
      "chaos",
      "overwhelmed",
      "pressure",
      "hectic",
    ])
  ) {
    responseText = pick([
      "I hear the anxiety in your words. Let's pause. You are safe in this moment.",
      "Anxiety tries to predict the future. Let's bring our focus back to right now.",
      "Take a slow breath. This feeling will pass, like a cloud moving across the sky.",
    ]);
    suggestion = {
      title: "5-Minute Grounding",
      link: "/meditations/tag/anxiety",
    };
  } else if (
    match([
      "work",
      "deadline",
      "busy",
      "job",
      "career",
      "study",
      "exam",
      "office",
      "boss",
      "meeting",
    ])
  ) {
    responseText = pick([
      "The pressure to perform is heavy. Remember, you can only do one thing at a time.",
      "Productivity shouldn't come at the cost of your sanity. What's one small thing you can control right now?",
      "Deadlines are important, but you are more important. Pace yourself.",
    ]);
    suggestion = {
      title: "Work Stress Relief",
      link: "/meditations/tag/anxiety",
    };
  } else if (match(["sad", "cry", "crying", "depressed", "hopeless", "down"])) {
    responseText = pick([
      "I'm so sorry you're going through this. It's okay to let it out.",
      "Sadness is a heavy coat to wear. Be gentle with yourself today.",
      "You don't have to carry it all alone. I'm here listening.",
    ]);
    suggestion = {
      title: "Healing Light Visualization",
      link: "/meditations/tag/healing",
    };
  } else if (match(["good", "great", "happy", "amazing", "awesome"])) {
    responseText = pick([
      "I'm so happy to hear that! It's wonderful when things go well.",
      "That's fantastic! Hold onto this feeling of joy.",
      "Celebrating these moments builds resilience. Enjoy it!",
    ]);
    suggestion = {
      title: "Gratitude Flow",
      link: "/meditations/tag/gratitude",
    };
  } else if (match(["thank", "thanks", "gratitude"])) {
    responseText = "You're very welcome. I'm always here if you need to talk.";
  } else if (
    match([
      "suggest",
      "recommend",
      "advice",
      "help",
      "what should i do",
      "guide",
      "tip",
    ])
  ) {
    responseText = pick([
      "Sometimes the best thing to do is stop and breathe. Shall we try a short session?",
      "I can suggest a quick practice to help you reset. How does that sound?",
      "If you're unsure, starting with a 3-minute breathing exercise is always a good idea.",
    ]);
    suggestion = {
      title: "Mindful Breathing",
      link: "/meditations/tag/mindfulness",
    };
  } else {
    // Randomized Fallbacks
    const fallbacks = [
      "I hear you. Can you tell me more about that?",
      "That sounds significant. How does that impact your mood properly?",
      "I'm listening. Please go on.",
      "Thank you for sharing that with me. What do you think would help right now?",
      "I see. Thoughts like that can be heavy. Do you want to try a distraction?",
    ];
    responseText = pick(fallbacks);
  }

  // Simulate "Typing" delay in client, but here just return
  res.status(200).json({
    response: responseText,
    suggestion: suggestion,
  });
});

module.exports = {
  submitAssessment,
  chatResponse,
};
