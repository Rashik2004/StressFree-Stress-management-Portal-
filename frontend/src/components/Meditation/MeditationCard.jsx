import React from 'react';

const MeditationCard = ({ title, description, duration, imageUrl, onPlay }) => {
  return (
    <div className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-primary/10 flex flex-col h-full cursor-pointer">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-primary mb-2">{title}</h3>
        <p className="text-primary/70 text-sm mb-4 flex-grow">{description}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-primary/5">
            <span className="text-xs font-bold text-primary/60 bg-primary/5 px-2 py-1 rounded">{duration} min</span>
            <button onClick={onPlay} className="text-sm font-bold text-primary hover:text-accent transition-colors">Play</button>
        </div>
      </div>
    </div>
  );
};

export default MeditationCard;
