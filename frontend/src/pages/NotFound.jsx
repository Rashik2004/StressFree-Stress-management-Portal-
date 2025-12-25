import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  // Using Unsplash images that match the "stress management" vibe but slightly abstract
  const images = [
    "https://images.unsplash.com/photo-1515023115689-589c33041697?q=80&w=2670&auto=format&fit=crop", // Dark/Moody
    "https://images.unsplash.com/photo-1519681393798-2f77f8008447?q=80&w=2670&auto=format&fit=crop", // Light/Airy
    "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop"  // Abstract
  ];

  return (
    <div className="min-h-screen bg-[#fafbf6] flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans">

      {/* Main 404 Visual */}
      <div className="flex items-center justify-center gap-2 md:gap-8 select-none">
        {['4', '0', '4'].map((digit, i) => (
          <motion.div
            key={i}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.8,
                delay: i * 0.2,
                type: "spring",
                bounce: 0.5
            }}
            className="relative text-[15rem] md:text-[25rem] font-black leading-none flex items-center justify-center overflow-hidden"
            style={{
               // We put the image behind the text and use mix-blend-mode or clipping
               // But standard background-clip: text is easiest
            }}
          >
             {/* Masked Text Approach */}
              <span
                className="bg-clip-text text-transparent bg-cover bg-center bg-no-repeat absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                style={{ backgroundImage: `url(${images[i]})` }}
              >
                {digit}
              </span>

              {/* Invisible placeholder to give size */}
              <span className="opacity-0">{digit}</span>

              {/* Decorative elements behind/around if needed */}
              <motion.div
                className="absolute inset-0 bg-blue-500/0 z-0"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
          </motion.div>
        ))}
      </div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center z-20 mt-[-2rem] md:mt-[-4rem]"
      >
        <p className="text-[#1c1c1c] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-8 max-w-md mx-auto leading-relaxed">
          The page you are looking for doesn't exist or another error occurred.
        </p>

        <Link
            to="/"
            className="inline-block relative group"
        >
            <span className="text-[#1c1c1c] font-bold text-sm tracking-widest uppercase pb-1 border-b-2 border-[#1c1c1c] group-hover:text-[#2e5c55] group-hover:border-[#2e5c55] transition-colors">
                Return Home
            </span>
        </Link>
      </motion.div>

    </div>
  );
};

export default NotFound;
