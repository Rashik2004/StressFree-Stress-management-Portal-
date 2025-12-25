import React, { useState } from 'react';

const MeditationPlayer = ({ audioUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement audio playback logic
  };

  return (
    <div className="bg-surface p-6 rounded-2xl shadow-lg border border-primary/10 max-w-md mx-auto my-8">
      <h3 className="text-xl font-bold text-primary mb-4 text-center">Now Playing: {title}</h3>
      <div className="flex justify-center mb-6">
        <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold hover:bg-primary/90 transition-colors shadow-md"
        >
            {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      {/* Audio element placeholder */}
      <audio src={audioUrl} controls className="w-full" />
    </div>
  );
};

export default MeditationPlayer;
