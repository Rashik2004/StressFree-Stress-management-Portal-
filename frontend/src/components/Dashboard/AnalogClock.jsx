import React, { useEffect, useState } from 'react';

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  // Rotations
  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
  const hourDeg = ((hours % 12 + minutes / 60) / 12) * 360;

  return (
    <div className="relative w-32 h-32 md:w-36 md:h-36">
      {/* Clock Face - Retro Cream/Off-white */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Outer Rim */}
        <circle cx="50" cy="50" r="48" fill="var(--surface)" stroke="var(--primary)" strokeWidth="4" />

        {/* Inner shadow/depth ring */}
        <circle cx="50" cy="50" r="44" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />

        {/* Hour Markers */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="10"
            x2="50"
            y2={i % 3 === 0 ? "18" : "14"} // Major markers longer
            transform={`rotate(${i * 30} 50 50)`}
            stroke="var(--primary)"
            strokeWidth={i % 3 === 0 ? "3" : "1.5"}
            strokeLinecap="round"
          />
        ))}

        {/* Hands container to ensure rotation center */}

        {/* Hour Hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="25"
          stroke="var(--primary)"
          strokeWidth="3.5"
          strokeLinecap="round"
          transform={`rotate(${hourDeg} 50 50)`}
        />

        {/* Minute Hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${minuteDeg} 50 50)`}
        />

        {/* Second Hand - Retro Red/Orange -> Now Accent */}
        <line
          x1="50"
          y1="58"
          x2="50"
          y2="12"
          stroke="var(--accent)"
          strokeWidth="1.5"
          transform={`rotate(${secondDeg} 50 50)`}
          className="transition-transform duration-[100ms] ease-linear"
        />

        {/* Center Cap */}
        <circle cx="50" cy="50" r="3" fill="var(--primary)" />
        <circle cx="50" cy="50" r="1.5" fill="var(--accent)" />

      </svg>
    </div>
  );
};

export default AnalogClock;
