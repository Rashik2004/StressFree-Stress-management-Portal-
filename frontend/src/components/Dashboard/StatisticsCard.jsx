import React from 'react';

const StatisticsCard = ({ title, value }) => {
  return (
    <div className="statistics-card">
      <h4>{title}</h4>
      <p className="stat-value">{value}</p>
    </div>
  );
};

export default StatisticsCard;
