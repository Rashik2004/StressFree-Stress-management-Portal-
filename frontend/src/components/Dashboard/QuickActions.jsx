
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Wind, Smile, FastForward } from 'lucide-react';
import { Link } from 'react-router-dom';

const actions = [
    {
        title: "Start 5-Min Calm",
        icon: Wind,
        color: "bg-[#e8f5e9] text-[#2e7d32]",
        link: "/meditations/category/6765d7997973796d49863c5a" // Breathing
    },
    {
        title: "Continue Session",
        icon: FastForward,
        color: "bg-[#fff3e0] text-[#ef6c00]",
        link: "/meditations" // Fallback to library for now
    },
    {
        title: "Log Mood",
        icon: Smile,
        color: "bg-[#f3e5f5] text-[#7b1fa2]",
        action: "SCROLL_TO_MOOD"
    },
    {
        title: "Breathing Exercise",
        icon: Play,
        color: "bg-[#e3f2fd] text-[#1565c0]",
        link: "/meditations/category/6765d7997973796d49863c5a"
    },
];

const QuickActions = ({ lastSession, breathingCategoryId }) => {
  const dynamicActions = actions.map(action => {
      /* --- Continue Session Logic --- */
      if (action.title === "Continue Session") {
          return {
              ...action,
              link: lastSession ? `/meditation-session/${lastSession._id}` : '/meditations',
              title: lastSession ? `Continue: ${lastSession.title.substring(0, 12)}...` : "Continue Session",
              disabled: !lastSession
          };
      }

      /* --- Breathing/Calm Logic --- */
      if (action.title === "Start 5-Min Calm" || action.title === "Breathing Exercise") {
          return {
              ...action,
              link: breathingCategoryId ? `/meditations/${breathingCategoryId}` : '/meditations'
          }
      }

      return action;
  });

  return (
    <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
      {dynamicActions.map((action, index) => (
        <motion.div
            key={index}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
        >
            <Link
                to={action.link || '#'}
                onClick={(e) => {
                    if(action.action === 'SCROLL_TO_MOOD') {
                        e.preventDefault();
                        document.getElementById('mood-logger')?.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
                className="block h-full"
            >
                <div className={`bg-white rounded-[2rem] p-6 shadow-sm border border-[#2e5c55]/5 hover:shadow-md transition-all flex flex-col items-center justify-center gap-4 text-center h-full min-h-[160px]`}>
                    <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center`}>
                        <action.icon size={28} />
                    </div>
                    <span className="font-bold text-[#2e5c55] leading-tight">
                        {action.title}
                    </span>
                </div>
            </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickActions;
