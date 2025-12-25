import React from 'react';
import StatisticsCard from './StatisticsCard';
import MoodTracker from './MoodTracker';

const ProgressDashboard = () => {
  return (
    <div className="progress-dashboard">
      <h2>Your Progress</h2>
      <div className="stats-container">
        <StatisticsCard title="Meditations Completed" value="12" />
        <StatisticsCard title="Minutes Meditated" value="120" />
        <StatisticsCard title="Current Streak" value="5 days" />
      </div>
      <MoodTracker />
    </div>
  );
};

export default ProgressDashboard;
