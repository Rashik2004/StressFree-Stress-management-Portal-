import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <img src="/src/assets/icons/Intersection.gif" alt="Loading..." className="w-16 h-16 md:w-24 md:h-24 object-contain" />
    </div>
  );
};

export default LoadingSpinner;
