import React from 'react';
import loadingGif from '../../assets/icons/Intersection.gif';

const Loader = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`}>
      <img src={loadingGif} alt="Loading..." className="w-16 h-16 md:w-24 md:h-24 object-contain" />
    </div>
  );
};

export default Loader;
