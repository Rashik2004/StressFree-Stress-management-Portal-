import { useState } from "react";

export const useMood = () => {
  const [moodHistory, setMoodHistory] = useState([]);

  const addMood = (mood) => {
    // TODO: Send mood to API
    setMoodHistory([...moodHistory, { mood, date: new Date() }]);
  };

  return { moodHistory, addMood };
};
