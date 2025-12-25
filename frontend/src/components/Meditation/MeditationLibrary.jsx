import React from 'react';
import MeditationCard from './MeditationCard';

const MeditationLibrary = () => {
  // Mock data
  const meditations = [
    { id: 1, title: 'Morning Calm', description: 'Start your day with peace.', duration: 10, imageUrl: 'placeholder.jpg' },
    { id: 2, title: 'Deep Sleep', description: 'Relax into a deep sleep.', duration: 20, imageUrl: 'placeholder.jpg' },
  ];

  const handlePlay = (id) => {
    console.log(`Playing meditation ${id}`);
  };

  return (
    <div className="py-12 bg-background transition-colors duration-500">
      <h2 className="text-3xl font-bold text-primary mb-8 px-4">Meditation Library</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {meditations.map((meditation) => (
          <MeditationCard
            key={meditation.id}
            {...meditation}
            onPlay={() => handlePlay(meditation.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MeditationLibrary;
