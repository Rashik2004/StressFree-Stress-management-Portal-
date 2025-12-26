const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const MeditationSession = require("../models/MeditationSession");
const ChatLog = require("../models/ChatLog");

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
  let detectedSentiment = "Neutral";

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
      `Welcome to this moment, ${
        user.name ? user.name.split(" ")[0] : "friend"
      }. I am here to hold space for you. How is your spirit today?`,
      `Hi there. The present moment is a gift. What would you like to explore together?`,
      `Greetings. Take a deep breath with me. How are you feeling right now?`,
    ]);
    detectedSentiment = "Greeting";
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
      "Your introversion is a beautiful sanctuary, not a wall. In silence, you find your true strength.",
      "The quiet ones often notice what others miss. Honor your need for solitude—it is where you recharge.",
      "Society praises noise, but peace is found in stillness. There is nothing wrong with being selective with your energy.",
    ]);
    suggestion = {
      link: "/meditations/tag/healing",
    };
    detectedSentiment = "Introversion";
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
      "Even in solitude, you are connected to the breath of life that flows through everyone. You are never truly alone.",
      "Loneliness is just an uninvited guest. Invite it in for tea, listen to what it needs, and treat yourself with the kindness you seek.",
      "The most important relationship you will ever have is with yourself. Nurture it with compassion today.",
    ]);
    suggestion = {
      title: "Loving Kindness Meditation",
      link: "/meditations/tag/loving-kindness",
    };
    detectedSentiment = "Loneliness";
  } else if (match(["tired", "exhausted", "sleep", "insomnia", "drained"])) {
    responseText = pick([
      "Rest is a sacred act, not a waste of time. Your body is asking for permission to let go.",
      "The world will keep spinning while you rest. surrender to the gravity of sleep.",
      "Exhaustion is your body's way of saying 'Enough'. Listen to it with kindness.",
    ]);
    suggestion = {
      title: "Deep Sleep Release",
      link: "/meditations/tag/sleep",
    };
    detectedSentiment = "Tiredness";
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
      "dread",
      "shaky",
      "racing",
      "tension",
      "unease",
      "doom",
      "restless",
      "edge",
    ])
  ) {
    responseText = pick([
      "Anxiety is like a storm, but you are the sky. The sky is never damaged by the storm. This too shall pass.",
      "Notice your feet on the floor. You are here, in this physical reality. The future is just a thought. Come back to now.",
      "Take a deep breath. Notice that right now, in this second, you are safe. Let the worry drift by like clouds.",
    ]);
    suggestion = {
      title: "5-Minute Grounding",
      link: "/meditations/tag/anxiety",
    };
    detectedSentiment = "Anxiety";
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
      "project",
      "task",
      "email",
      "call",
      "zoom",
      "presentation",
      "interview",
      "manager",
      "overtime",
      "burnout",
    ])
  ) {
    responseText = pick([
      "We can only do one thing at a time effectively. Breathe. Just do the next right thing.",
      "You are not a machine. Productivity without presence is just busy-work. Take a conscious breath before you continue.",
      "The work will always be there, but this moment is fleeting. Can you find a moment of stillness amidst the chaos?",
    ]);
    suggestion = {
      title: "Work Stress Relief",
      link: "/meditations/tag/anxiety",
    };
    detectedSentiment = "Work Stress";
  } else if (
    match([
      "sad",
      "cry",
      "crying",
      "depressed",
      "hopeless",
      "down",
      "blue",
      "heavy",
      "hollow",
      "numb",
      "miserable",
      "unhappy",
      "gloom",
      "tears",
      "empty",
    ])
  ) {
    responseText = pick([
      "It is brave to feel deep sadness. It cleanses the soul. Let the tears flow if they need to.",
      "Hold this sadness like a small child. Do not push it away. Offer it your compassion.",
      "Darkness is a part of the cycle, just like night. The sun will rise again, but for now, it's okay to rest in the dark.",
    ]);
    suggestion = {
      title: "Healing Light Visualization",
      link: "/meditations/tag/healing",
    };
    detectedSentiment = "Sadness";
  } else if (
    match(["morning", "wake", "woke", "start", "day", "early", "rise"])
  ) {
    responseText = pick([
      "Good morning. How you start your day sets the tone for everything else. Shall we set an intention?",
      "Rise and shine. The world awaits your unique light. What is one thing you are looking forward to?",
      "Morning is a fresh page. You have the power to write a beautiful story today.",
    ]);
    suggestion = {
      title: "Morning Clarity",
      link: "/meditations/tag/focus",
    };
    detectedSentiment = "Morning";
  } else if (match(["good", "great", "happy", "amazing", "awesome"])) {
    responseText = pick([
      "Wonderful. Savor this feeling. Let it fill every cell of your body.",
      "Joy is the natural state of a free mind. Enjoy this beautiful moment.",
      "Gratitude turns what we have into enough. Thank you for sharing your light.",
    ]);
    suggestion = {
      title: "Gratitude Flow",
      link: "/meditations/tag/gratitude",
    };
    detectedSentiment = "Happiness";
  } else if (match(["thank", "thanks", "gratitude"])) {
    responseText = "Namaste. I am honored to walk this path with you.";
    detectedSentiment = "Gratitude";
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
      "The answer often lies in silence. Shall we sit together for a moment?",
      "Trust your intuition. A clear mind makes better decisions. Let's clear the fog.",
      "Sometimes the most productive thing to do is to stop. I recommend a short pause.",
    ]);
    suggestion = {
      title: "Mindful Breathing",
      link: "/meditations/tag/mindfulness",
    };
    detectedSentiment = "Advice";
  } else if (
    match([
      "angry",
      "mad",
      "furious",
      "annoyed",
      "irritated",
      "rage",
      "hate",
      "pissed",
      "resentment",
      "temper",
    ])
  ) {
    responseText = pick([
      "Anger is a powerful energy, like fire. Instead of fighting it, can we sit with it and watch it burn safely?",
      "It makes sense to feel angry. Your boundaries may have been crossed. Breathe into the heat without acting on it.",
      "Underneath anger is often hurt. Let yourself feel the fire without letting it consume you.",
    ]);
    suggestion = {
      title: "Transforming Anger",
      link: "/meditations/tag/emotions",
    };
    detectedSentiment = "Anger";
  } else if (
    match([
      "confused",
      "lost",
      "unsure",
      "doubt",
      "decision",
      "choice",
      "uncertain",
      "clarity",
      "direction",
    ])
  ) {
    responseText = pick([
      "When the water is muddy, we cannot see the bottom. Be still, and the mud will settle on its own.",
      "Confusion is just the mind trying to control the uncontrollable. Let go of the need to know right now.",
      "The answer is already within you. It is just quiet. Listen to the silence between your thoughts.",
    ]);
    suggestion = {
      title: "Finding Clarity",
      link: "/meditations/tag/focus",
    };
    detectedSentiment = "Confusion";
  } else if (
    match([
      "pain",
      "hurt",
      "sick",
      "headache",
      "ache",
      "body",
      "physical",
      "ill",
      "sore",
    ])
  ) {
    responseText = pick([
      "Your body is speaking to you. Listen with kindness, not judgment. Send breath to the area of discomfort.",
      "Pain is a sensation. Suffering is our resistance to it. Can you soften around the edges of the feeling?",
      "Be gentle with your vessel. It carries you through this life. Rest is the best medicine right now.",
    ]);
    suggestion = {
      title: "Body Scan for Pain",
      link: "/meditations/tag/body-scan",
    };
    detectedSentiment = "Pain";
  } else if (
    match([
      "grief",
      "loss",
      "died",
      "passed",
      "miss",
      "mourning",
      "heartbroken",
      "broken",
    ])
  ) {
    responseText = pick([
      "Grief is the price we pay for love. It is a heavy, sacred weight. Do not rush to put it down.",
      "There is no timeline for healing. Your heart is processing a great change. Be patient with yourself.",
      "The ones we love are never truly gone; they live in the quiet corners of our heart. Honor your memory of them.",
    ]);
    suggestion = {
      title: "Healing Grief",
      link: "/meditations/tag/healing",
    };
    detectedSentiment = "Grief";
  } else {
    // Randomized Fallbacks
    const fallbacks = [
      "I hear you. Can you close your eyes and take one deep breath for me?",
      "That sounds intense. Where do you feel that emotion in your body right now?",
      "I am here. Take your time. There is no rush.",
      "Thank you for sharing. Awareness is the first step to freedom. What do you need most right now?",
      "Let's slow down. Thoughts come and go. Which one is troubling you the most?",
    ];
    responseText = pick(fallbacks);
  }

  // Simulate "Typing" delay in client, but here just return
  // Save log to DB
  try {
    await ChatLog.create({
      user: user._id,
      message,
      response: responseText,
      sentiment: detectedSentiment,
    });
  } catch (err) {
    console.error("Failed to save chat log:", err);
    // Don't fail the response if logging fails
  }

  res.status(200).json({
    response: responseText,
    suggestion: suggestion,
  });
});

module.exports = {
  submitAssessment,
  chatResponse,
};
