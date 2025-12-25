import React from 'react';

const ChallengeCard = ({ challenge }) => {
  return (
    <div className="challenge-card">
      <h3>{challenge.title}</h3>
      <p>{challenge.description}</p>
      <button>Join Challenge</button>
    </div>
  );
};

export default ChallengeCard;
