import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Zap, Moon, Heart } from 'lucide-react';

const options = [
  { title: "5-Min Calm", icon: Wind, color: "bg-[#e8f5e9] text-[#2e7d32]", hover: "group-hover:bg-[#c8e6c9]" },
  { title: "Deep Focus", icon: Zap, color: "bg-[#fff3e0] text-[#ef6c00]", hover: "group-hover:bg-[#ffe0b2]" },
  { title: "Panic SOS", icon: Heart, color: "bg-[#ffebee] text-[#c62828]", hover: "group-hover:bg-[#ffcdd2]" },
  { title: "Sleep Aid", icon: Moon, color: "bg-[#e3f2fd] text-[#1565c0]", hover: "group-hover:bg-[#bbdefb]" },
];

const QuickStartGrid = () => {
  return (
    <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4 h-full min-h-[300px]">
      {options.map((option, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`h-full rounded-[2rem] p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 group bg-white shadow-sm hover:shadow-md border border-[#2e5c55]/5`}
        >
          <div className={`w-14 h-14 rounded-full ${option.color} flex items-center justify-center transition-colors duration-300 ${option.hover}`}>
            <option.icon size={28} />
          </div>
          <span className="font-bold text-[#2e5c55] text-center leading-tight">
            {option.title}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickStartGrid;
