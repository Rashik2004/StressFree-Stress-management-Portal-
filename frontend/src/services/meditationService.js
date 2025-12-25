import api from "./api";

export const getMeditations = async () => {
  const response = await api.get("/meditations");
  return response.data;
};
