import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center w-full min-h-[200px] ${className}`}>
      <div className="relative flex items-center justify-center">

        {/* Central Breathing Core */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-4 h-4 bg-[#235851] rounded-full z-10"
        />

        {/* Inner Ring */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-12 h-12 border-2 border-[#8ea8a2] rounded-full border-t-transparent border-l-transparent opacity-80"
        />

        {/* Middle Ring */}
        <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-20 h-20 border-[1.5px] border-[#d1ee5d] rounded-full border-b-transparent border-r-transparent opacity-60"
        />

        {/* Outer Orbiting Dot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute w-28 h-28"
        >
           <motion.div
             className="w-3 h-3 bg-[#e8a83e] rounded-full"
             animate={{ scale: [1, 1.5, 1] }}
             transition={{ duration: 2, repeat: Infinity }}
           />
        </motion.div>

      </div>

      {/* Optional: Text below */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute mt-32 text-[#235851] font-medium tracking-widest text-sm uppercase opacity-70"
      >
        Finding Peace...
      </motion.p>
    </div>
  );
};

export default Loader;
