import React, { useState } from 'react';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = ['Happy', 'Calm', 'Stressed', 'Sad', 'Anxious'];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    // TODO: Save mood to backend
    console.log(`Mood selected: ${mood}`);
  };

  return (
    <div className="mood-tracker">
      <h3>How are you feeling today?</h3>
      <div className="mood-options">
        {moods.map((mood) => (
          <button
            key={mood}
            className={`mood-btn ${selectedMood === mood ? 'selected' : ''}`}
            onClick={() => handleMoodSelect(mood)}
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
