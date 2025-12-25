import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const recommendations = {
  morning: {
    greeting: "Morning Focus",
    title: "Start Your Day",
    highlight: "With Clarity",
    description: "A 5-minute breathing exercise to center your mind before the day begins.",
    duration: "5 min",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2670&auto=format&fit=crop",
    color: "bg-[#e8a83e]", // Morning Sun / Gold
    buttonColor: "text-[#e8a83e]",
    categoryLink: "/meditations/category/6765d7997973796d49863c5a" // Breathing
  },
  afternoon: {
    greeting: "Midday Reset",
    title: "Relieving",
    highlight: "Work Stress",
    description: "A 10-minute guided session to help you detach from work and recharge focus.",
    duration: "10 min",
    image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2540&auto=format&fit=crop",
    color: "bg-[#2e5c55]", // Deep Green
    buttonColor: "text-[#2e5c55]",
    categoryLink: "/meditations/tag/work" // Work Tag
  },
  evening: {
    greeting: "Evening Unwind",
    title: "Prepare For",
    highlight: "Deep Sleep",
    description: "Let go of the day with this gentle body scan to promote restful sleep.",
    duration: "15 min",
    image: "https://images.unsplash.com/photo-1511296933631-18b5de9e6717?auto=format&fit=crop&w=1000&q=80",
    color: "bg-[#234842]", // Night / Dark Teal
    buttonColor: "text-[#234842]",
    categoryLink: "/meditations/category/6765d7997973796d49863c5d" // Guided (or Sleep if available)
  }
};

const getTimeBasedRecommendation = () => {
  const hour = new Date().getHours();
  if (hour < 12) return recommendations.morning;
  if (hour < 17) return recommendations.afternoon;
  return recommendations.evening;
};

const TodayRecommendation = ({ data }) => {
  // If API data is missing, fallback to static time-based recommendation
  const fallbackRec = getTimeBasedRecommendation();
  const rec = data || fallbackRec;

  if (!rec) return (
      <div className="col-span-12 lg:col-span-8 bg-gray-200 rounded-[2.5rem] min-h-[300px] animate-pulse"></div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`col-span-12 lg:col-span-8 ${rec.color} rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden text-white min-h-[300px] flex flex-col justify-center transition-colors duration-1000`}
    >
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 w-96 h-96 bg-[#d1ee5d] rounded-full blur-[100px] opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none" />

       <div className="relative z-10 max-w-lg">
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
            {rec.greeting}
          </div>
          <h2 className="text-3xl md:text-5xl font-serif mb-4 leading-tight">
            {rec.title} <br/> <span className="italic text-[#d1ee5d]">{rec.highlight}</span>
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-sm leading-relaxed">
            {rec.description}
          </p>

          <Link to={rec.categoryLink}>
            <button className={`bg-white ${rec.buttonColor} px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-[#d1ee5d] transition-colors shadow-lg shadow-black/10 group w-fit`}>
                <span className={`w-8 h-8 rounded-full ${rec.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Play size={12} fill="currentColor" />
                </span>
                Start Session ({rec.duration})
            </button>
          </Link>
       </div>

       {/* Floating Illustration Placeholder */}
       <div className="absolute bottom-0 right-0 w-1/3 h-full hidden md:flex items-end justify-end pointer-events-none">
          <div className={`w-64 h-64 bg-gradient-to-t from-${rec.color.replace('bg-', '')} to-transparent z-20 absolute bottom-0 right-0`}></div>
          <img
            src={rec.image}
            className="w-full h-full object-cover opacity-50 mix-blend-overlay mask-image-gradient"
            alt="Relaxation"
          />
       </div>
    </motion.div>
  );
};

export default TodayRecommendation;
