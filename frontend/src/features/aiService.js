import api from "../services/api";

// API_URL is now handled by the central api instance with path /ai/

// Submit Assessment
const submitAssessment = async (answers, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post("/ai/assess", { answers }, config);
  return response.data;
};

// Chat with AI
const chatWithAI = async (message, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post("/ai/chat", { message }, config);
  return response.data;
};

const aiService = {
  submitAssessment,
  chatWithAI,
};

export default aiService;
