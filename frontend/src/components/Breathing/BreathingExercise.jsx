import React, { useState, useEffect } from 'react';

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Inhale'); // Inhale, Hold, Exhale
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
             // Logic to switch phases
             return 4; // Placeholder
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, phase]);

  const toggleExercise = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="breathing-exercise">
      <h2>Breathing Exercise</h2>
      <div className={`breathing-circle ${phase.toLowerCase()}`}>
        <span>{phase}</span>
        <span>{timer}</span>
      </div>
      <button onClick={toggleExercise}>{isActive ? 'Stop' : 'Start'}</button>
    </div>
  );
};

export default BreathingExercise;
