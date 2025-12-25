import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Smile, Activity, Clock, Zap } from 'lucide-react';
import AnalogClock from './AnalogClock';

const WelcomeHeader = ({ summary }) => {
  const { user } = useContext(AuthContext);
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
  const hour = new Date().getHours();
  const getGreeting = () => {
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 22) return 'Good evening';
    return 'Good night';
  };
  const greeting = getGreeting();

  const { mood, stress, minutesMeditated } = summary;

  return (
    <div className="w-full mb-8">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">

        {/* Left Section: Greeting */}
        <div>
           <h1 className="text-4xl md:text-5xl font-serif text-primary mb-2 leading-tight">
             {greeting}, <br className="hidden md:block" />
             <span className="italic relative whitespace-nowrap">
               {user?.name?.split(' ')[0] || 'Friend'}
               <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
               </svg>
             </span>
           </h1>
           <p className="text-primary/70 text-lg">Here's how you're doing today.</p>
        </div>

        {/* Right Section: Stats & Clock */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-6">

            {/* Today's Summary Stats */}
            <div className="bg-surface p-4 rounded-[2rem] shadow-sm border border-primary/5 flex flex-wrap justify-center md:flex-nowrap items-center gap-2 md:gap-4 w-full md:w-auto transition-colors duration-500">

                {/* Mood */}
                <div className="flex items-center gap-3 px-4 py-2 bg-primary/5 rounded-2xl">
                     <div className="p-2 bg-blue-100/50 text-blue-600 rounded-full">
                        <Smile size={18} />
                     </div>
                     <div>
                         <p className="text-xs font-bold text-primary/50 uppercase">Mood</p>
                         <p className="text-lg font-bold text-primary">{mood || '-'}</p>
                     </div>
                </div>

                {/* Stress */}
                <div className="flex items-center gap-3 px-4 py-2 bg-primary/5 rounded-2xl">
                     <div className="p-2 bg-red-100/50 text-red-600 rounded-full">
                        <Activity size={18} />
                     </div>
                     <div>
                         <p className="text-xs font-bold text-primary/50 uppercase">Stress</p>
                         <p className="text-lg font-bold text-primary">{stress ? `${stress}/10` : '-'}</p>
                     </div>
                </div>

                 {/* Minutes */}
                 <div className="flex items-center gap-3 px-4 py-2 bg-primary/5 rounded-2xl">
                     <div className="p-2 bg-green-100/50 text-green-600 rounded-full">
                        <Clock size={18} />
                     </div>
                     <div>
                         <p className="text-xs font-bold text-primary/50 uppercase">Meditated</p>
                         <p className="text-lg font-bold text-primary">{minutesMeditated}m</p>
                     </div>
                </div>

                <div className="hidden xl:block w-px h-10 bg-primary/10 mx-2"></div>

                <div className="hidden xl:block max-w-[140px]">
                     <p className="text-xs font-bold text-primary/40 italic leading-tight">
                        {minutesMeditated > 0 ? "Great job keeping up!" : "Try a 5‑min session today."}
                     </p>
                </div>

            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-24 bg-primary/10"></div>

            {/* Clock Section */}
            <div className="flex flex-col items-center">
                <AnalogClock />
                <p className="text-sm font-bold text-primary/60 uppercase tracking-widest mt-2 bg-surface/50 px-3 py-1 rounded-full border border-primary/5">{date}</p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
