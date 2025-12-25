import api from "../services/api";

// API_URL is now handled by the central api instance with path /dashboard/

// Get Dashboard Data
const getDashboardData = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/dashboard/", config);
  return response.data;
};

// Log Mood
const logMood = async (moodData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post("/dashboard/mood", moodData, config);
  return response.data;
};

// Update Stats (Complete Session)
const updateStats = async (sessionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post("/dashboard/stats", sessionData, config);
  return response.data;
};

// Get Schedule (Lightweight)
const getSchedule = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/dashboard/schedule", config);
  return response.data;
};

// Add Schedule
const addSchedule = async (scheduleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post("/dashboard/schedule", scheduleData, config);
  return response.data;
};
const deleteSchedule = async (itemId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete("/dashboard/schedule/" + itemId, config);
  return response.data;
};

const dashboardService = {
  getDashboardData,
  logMood,
  updateStats,
  addSchedule,
  getSchedule,
  deleteSchedule,
};

export default dashboardService;
