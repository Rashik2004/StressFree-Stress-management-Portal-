
import React from 'react';
import { Play, Clock, Wind, Moon, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const sessions = [
    { title: "Morning Clarity", duration: "10 min", type: "Meditation", icon: Brain, color: "bg-[#d1ee5d]", link: "/meditations/tag/energy" },
    { title: "Desk Stretch", duration: "5 min", type: "Movement", icon: Wind, color: "bg-[#e8dcb8]", link: "/meditations/tag/work" },
    { title: "Sleep Prep", duration: "15 min", type: "Relaxation", icon: Moon, color: "bg-[#2e5c55] text-white", link: "/meditations/tag/sleep" },
];

const iconMap = {
    Brain, Wind, Moon, Play, Clock
};

const RecommendedSessionsGrid = ({ sessions }) => {
    // Fallback if no sessions passed yet
    const displaySessions = sessions || [
        { title: "Morning Clarity", duration: "10 min", type: "Meditation", icon: "Brain", color: "bg-[#d1ee5d]", link: "/meditations/tag/energy" },
        { title: "Desk Stretch", duration: "5 min", type: "Movement", icon: "Wind", color: "bg-[#e8dcb8]", link: "/meditations/tag/work" },
        { title: "Sleep Prep", duration: "15 min", type: "Relaxation", icon: "Moon", color: "bg-[#2e5c55] text-white", link: "/meditations/tag/sleep" },
    ];

    return (
        <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#2e5c55]">Recommended For You Today</h3>
                <Link to="/meditations" className="text-sm font-bold text-[#2e5c55]/60 hover:text-[#2e5c55]">See All</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {displaySessions.map((session, i) => {
                    const IconComponent = iconMap[session.icon] || Brain;

                    return (
                        <div key={i} className="bg-white rounded-[2rem] p-6 border border-[#2e5c55]/5 hover:shadow-lg transition-shadow flex flex-col justify-between min-h-[180px] group">

                            <div className="flex justify-between items-start mb-4">
                                 <div className={`w-10 h-10 rounded-full ${session.color} flex items-center justify-center`}>
                                    <IconComponent size={18} className={session.color.includes('text-white') ? 'text-white' : 'text-[#2e5c55]'} />
                                 </div>
                                 <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">{session.type}</span>
                            </div>

                            <div>
                                <h4 className="font-bold text-[#2e5c55] text-lg mb-1 group-hover:text-[#d1ee5d] transition-colors">{session.title}</h4>
                                <div className="flex items-center gap-1 text-[#2e5c55]/50 text-xs font-bold uppercase tracking-wider">
                                    <Clock size={12} /> {session.duration}
                                </div>
                            </div>

                            <Link to={session.link} className="mt-4 w-full py-3 bg-[#f8f9fa] rounded-xl text-[#2e5c55] font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-[#2e5c55] group-hover:text-white transition-colors">
                                <Play size={14} /> Start
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecommendedSessionsGrid;
