import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Calendar } from 'lucide-react';

const ProgressSummary = ({ stats }) => {
  const currentStreak = stats?.currentStreak || 0;
  // In a real app, 'totalMinutes' might need to be filtered for 'This Week' specifically
  // For now, we'll display totalMinutes as a placeholder or map 'stats.weeklyMinutes' if we added that
  const weeklyMinutes = stats?.totalMinutes || 0;

  return (
    <div className="flex flex-col gap-4">
        {/* Streak Block */}
        <motion.div whileHover={{ y: -2 }} className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#2e5c55]/5 flex items-center justify-between">
            <div>
                 <p className="text-[#2e5c55]/50 text-xs font-bold uppercase tracking-wider mb-1">Current Streak</p>
                 <div className="flex items-center gap-2">
                     <span className="text-4xl font-black text-[#2e5c55]">{currentStreak}</span>
                     <span className="text-xl font-bold text-[#2e5c55]/40">days</span>
                 </div>
            </div>
            <div className="w-16 h-16 bg-[#fff3e0] rounded-full flex items-center justify-center text-orange-500">
                <Award size={32} />
            </div>
        </motion.div>

        {/* Weekly Minutes Block */}
        <motion.div whileHover={{ y: -2 }} className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#2e5c55]/5 flex items-center justify-between">
            <div>
                 <p className="text-[#2e5c55]/50 text-xs font-bold uppercase tracking-wider mb-1">Total Mins</p>
                 <div className="flex items-center gap-2">
                     <span className="text-4xl font-black text-[#2e5c55]">{weeklyMinutes}</span>
                     <span className="text-xl font-bold text-[#2e5c55]/40">mins</span>
                 </div>
                 <div className="h-1 w-24 bg-gray-100 rounded-full mt-2 overflow-hidden">
                     <div className="h-full bg-[#d1ee5d] w-[60%]"></div>
                 </div>
            </div>
            <div className="flex gap-1 h-12 items-end">
                 {[40, 70, 30, 85, 50, 90, 60].map((h, i) => (
                     <div key={i} className="w-1.5 bg-[#2e5c55] rounded-full opacity-20" style={{ height: `${h}%` }}></div>
                 ))}
            </div>
        </motion.div>
    </div>
  );
};

export default ProgressSummary;
