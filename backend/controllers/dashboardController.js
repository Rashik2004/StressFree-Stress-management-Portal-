const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const MeditationSession = require("../models/MeditationSession");

/* --- Get Dashboard Data --- */
const getDashboardData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  /* --- Today's Summary --- */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysMoodLogs = user.moodLogs.filter(
    (log) => new Date(log.date) >= today
  );
  const todaysMoodLog =
    todaysMoodLogs.length > 0
      ? todaysMoodLogs[todaysMoodLogs.length - 1]
      : null;
  const todaysMeditation = user.meditationHistory.filter(
    (h) => new Date(h.completedAt) >= today
  );
  const todaysMinutes = todaysMeditation.reduce(
    (acc, curr) => acc + curr.duration / 60,
    0
  );

  /* --- Recommendations Logic (Time of Day) --- */
  const hour = new Date().getHours();
  let recommendationType = "Guided Meditation";
  let greeting = "Welcome Back";
  let highlight = "Take a Moment";

  if (hour < 12) {
    recommendationType = "Breathing Meditation";
    greeting = "Morning Focus";
    highlight = "Start With Clarity";
  } else if (hour >= 17) {
    recommendationType = "Body Scan Meditation";
    greeting = "Evening Unwind";
    highlight = "Prepare for Rest";
  } else {
    recommendationType = "Guided Meditation";
    greeting = "Midday Reset";
    highlight = "Recharge Focus";
  }

  const category = await require("../models/MeditationCategory").findOne({
    title: { $regex: recommendationType, $options: "i" },
  });
  let recommendation = null;

  if (category) {
    const session = await MeditationSession.findOne({ category: category._id });
    if (session) {
      recommendation = {
        greeting,
        title: session.title,
        highlight,
        description: session.description,
        duration: `${Math.round(session.duration / 60)} min`,
        image: session.imageUrl,
        color:
          hour < 12
            ? "bg-[#e8a83e]"
            : hour >= 17
            ? "bg-[#234842]"
            : "bg-[#2e5c55]",
        buttonColor:
          hour < 12
            ? "text-[#e8a83e]"
            : hour >= 17
            ? "text-[#234842]"
            : "text-[#2e5c55]",
        categoryLink: `/meditations/${category._id}`,
      };
    }
  }

  /* --- Daily Stats (Current Week) --- */
  const statsMap = {};
  const todayDate = new Date();
  const dayOfWeek = todayDate.getDay();
  const diff = todayDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(todayDate.setDate(diff));
  monday.setHours(0, 0, 0, 0);

  const dailyStats = [];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = d.getDate().toString();
    dailyStats.push({
      day: days[i],
      date: dateStr,
      fullDate: new Date(d),
      minutes: 0,
    });
  }

  user.meditationHistory.forEach((h) => {
    const hDate = new Date(h.completedAt);
    if (hDate >= monday) {
      const dayIndex = hDate.getDay() === 0 ? 6 : hDate.getDay() - 1;
      if (dailyStats[dayIndex]) {
        dailyStats[dayIndex].minutes += Math.round(h.duration / 60);
      }
    }
  });

  /* --- Mood-Based Recommendations --- */
  let suggestedSessions = [];
  const lastLog =
    user.moodLogs.length > 0 ? user.moodLogs[user.moodLogs.length - 1] : null;

  if (lastLog) {
    let searchTags = [];
    const mood = lastLog.mood.toLowerCase();
    const stress = lastLog.stress;

    if (stress >= 7) {
      searchTags = ["stress", "anxiety", "calm", "panic"];
    } else if (mood === "bad" || mood === "terrible") {
      searchTags = ["emotional", "healing", "comfort"];
    } else if (mood === "great" || mood === "good") {
      searchTags = ["focus", "growth", "gratitude"];
    } else {
      searchTags = ["mindfulness", "balance"];
    }

    const foundSessions = await MeditationSession.find({
      tags: { $in: searchTags },
    }).limit(3);

    suggestedSessions = foundSessions.map((s) => ({
      title: s.title,
      duration: `${Math.round(s.duration / 60)} min`,
      type: "Recommended",
      icon: "Brain",
      color: "bg-[#e8dcb8]",
      link: `/meditation-session/${s._id}`,
      imageUrl: s.imageUrl,
    }));
  }

  if (suggestedSessions.length < 3) {
    const remaining = 3 - suggestedSessions.length;
    const filler = await MeditationSession.find({
      _id: { $nin: suggestedSessions.map((s) => s._id) },
    }).limit(remaining);
    const mappedFiller = filler.map((s) => ({
      title: s.title,
      duration: `${Math.round(s.duration / 60)} min`,
      type: "Popular",
      icon: "Wind",
      color: "bg-[#d1ee5d]",
      link: `/meditation-session/${s._id}`,
      imageUrl: s.imageUrl,
    }));
    suggestedSessions = [...suggestedSessions, ...mappedFiller];
  }

  /* --- "Continue" Feature --- */
  const lastHistoryItem =
    user.meditationHistory.length > 0
      ? user.meditationHistory[user.meditationHistory.length - 1]
      : null;
  let lastSession = null;

  if (lastHistoryItem && lastHistoryItem.session) {
    lastSession = await MeditationSession.findById(lastHistoryItem.session);
  }

  /* --- Quick Actions Categories --- */
  const breathingCategory =
    await require("../models/MeditationCategory").findOne({
      title: { $regex: "Breathing", $options: "i" },
    });

  res.status(200).json({
    summary: {
      mood: todaysMoodLog ? todaysMoodLog.mood : null,
      stress: todaysMoodLog ? todaysMoodLog.stress : null,
      minutesMeditated: Math.round(todaysMinutes),
      streak: user.stats.currentStreak,
    },
    recommendation,
    suggestedSessions,
    lastSession,
    breathingCategoryId: breathingCategory ? breathingCategory._id : null,
    schedule: user.schedule,
    dailyStats,
    history: user.meditationHistory.slice(-7),
    stats: user.stats,
  });
});

/* --- Log Mood --- */
const logMood = asyncHandler(async (req, res) => {
  const { mood, stress, note } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.moodLogs.push({
    mood,
    stress,
    note,
  });

  await user.save();
  res.status(200).json({ success: true, data: user.moodLogs });
});

/* --- Get Schedule --- */
const getSchedule = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json(user.schedule);
});

/* --- Update Stats --- */
const updateStats = asyncHandler(async (req, res) => {
  const { sessionId, duration } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.meditationHistory.push({
    session: sessionId,
    duration: duration,
    completedAt: Date.now(),
  });

  user.stats.totalMinutes += Math.round(duration / 60);

  /* --- Streak Logic --- */
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastMeditated = user.stats.lastMeditated
    ? new Date(user.stats.lastMeditated)
    : null;

  if (!lastMeditated || lastMeditated < today) {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastMeditated && lastMeditated >= yesterday) {
      user.stats.currentStreak += 1;
    } else if (!lastMeditated || lastMeditated < yesterday) {
      user.stats.currentStreak = 1;
    }
    user.stats.lastMeditated = Date.now();
  } else {
    user.stats.lastMeditated = Date.now();
  }

  await user.save();
  res.status(200).json(user.stats);
});

/* --- Add Schedule Item --- */
const addScheduleItem = asyncHandler(async (req, res) => {
  const { title, time, day, meditationId } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const alreadyScheduled = user.schedule.find(
    (s) => s.day === day && s.time === time
  );

  if (alreadyScheduled) {
    res.status(400);
    throw new Error(
      "Reminder can't be set you already have schedule meditations"
    );
  }

  const newScheduleItem = {
    title,
    time,
    day,
    meditationId, // Optional
  };

  user.schedule.push(newScheduleItem);
  await user.save();

  res.status(200).json(user.schedule);
});

/* --- Delete Schedule Item --- */
const deleteScheduleItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { itemId } = req.params;

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.schedule = user.schedule.filter(
    (item) => item._id.toString() !== itemId
  );
  await user.save();

  res.status(200).json(user.schedule);
});

module.exports = {
  getDashboardData,
  logMood,
  getSchedule,
  updateStats,
  addScheduleItem,
  deleteScheduleItem,
};
