
import React, { useState, useEffect, useContext } from 'react';
import { Calendar, CheckCircle, Circle, Clock, ArrowRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import dashboardService from '../../features/dashboardService';
import { AuthContext } from '../../context/AuthContext';



const WeeklyPlanner = ({ schedule: initialSchedule, dailyStats }) => {
    // If no dailyStats provided, fallback or use empty array
    const weekData = dailyStats || [];
    const { user } = useContext(AuthContext);
    const [schedule, setSchedule] = useState(initialSchedule || []);

    useEffect(() => {
        setSchedule(initialSchedule || []);
    }, [initialSchedule]);

    const handleDelete = async (itemId) => {
        if (!window.confirm("Are you sure you want to remove this scheduled session?")) return;

        try {
            const updatedSchedule = await dashboardService.deleteSchedule(itemId, user.token);
            setSchedule(updatedSchedule);
        } catch (error) {
            console.error("Failed to delete schedule item", error);
            alert("Failed to delete item.");
        }
    };

    // Helper to check if a day is today
    const isToday = (fullDateStr) => {
        if(!fullDateStr) return false;
        const d = new Date(fullDateStr);
        const today = new Date();
        return d.getDate() === today.getDate() && d.getMonth() === today.getMonth();
    };

    return (
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#2e5c55]/5 col-span-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-[#2e5c55]">Weekly Overview</h3>
                    <p className="text-[#2e5c55]/50 font-medium">Your meditation consistency</p>
                </div>
                <div className="p-3 bg-[#2e5c55]/5 rounded-full text-[#2e5c55]">
                    <Calendar size={24} />
                </div>
            </div>

            <div className="grid grid-cols-7 gap-4 min-w-[800px] lg:min-w-0 overflow-x-auto pb-2">
                {weekData.map((day, i) => {
                    const isCurrentDay = isToday(day.fullDate);

                    return (
                        <div key={i} className={`flex flex-col gap-3 group`}>
                             <div className="text-center mb-2">
                                 <p className="text-xs font-bold text-[#2e5c55]/40 uppercase mb-1">{day.day}</p>
                                 <p className={`text-lg font-bold w-10 h-10 mx-auto flex items-center justify-center rounded-full ${isCurrentDay ? 'bg-[#2e5c55] text-white' : 'text-[#2e5c55]'}`}>
                                     {day.date}
                                 </p>
                             </div>

                             <div className={`flex-1 min-h-[120px] rounded-2xl p-3 flex flex-col justify-end gap-2 transition-colors group-hover:bg-[#f1f3e0] relative overflow-hidden ${day.minutes > 0 ? 'bg-[#d1ee5d]/20' : 'bg-[#f8f9fa]'}`}>

                                 {/* Visual Bar for Minutes */}
                                 {day.minutes > 0 && (
                                     <div
                                        className="absolute bottom-0 left-0 w-full bg-[#d1ee5d] opacity-30 transition-all duration-500"
                                        style={{ height: `${Math.min(day.minutes, 60)}%` }} // Cap visual at 60 mins for scale
                                     />
                                 )}

                                 {/* Content */}
                                 {day.minutes > 0 ? (
                                     <div className="relative z-10 text-center">
                                         <span className="text-2xl font-black text-[#2e5c55]">{day.minutes}</span>
                                         <p className="text-[10px] font-bold uppercase text-[#2e5c55]/60">Mins</p>
                                     </div>
                                 ) : (
                                     <div className="h-full flex items-center justify-center text-[#2e5c55]/20 text-xs font-bold italic">
                                         -
                                     </div>
                                 )}
                             </div>
                        </div>
                    );
                })}
            </div>

            {/* Upcoming Schedule Section */}
            {schedule && schedule.length > 0 && (
                <div className="mt-8 border-t border-[#2e5c55]/10 pt-6">
                    <h4 className="text-lg font-bold text-[#2e5c55] mb-4 flex items-center gap-2">
                        <Clock size={18} />
                        Upcoming Schedule
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {schedule.map((item, index) => (
                            <div key={item._id || index} className="bg-[#f8f9fa] rounded-xl p-4 flex items-center justify-between group hover:bg-[#f1f3e0] transition-colors border border-transparent hover:border-[#2e5c55]/10 relative">
                                <div>
                                    <h5 className="font-bold text-[#2e5c55] text-sm">{item.title}</h5>
                                    <div className="flex items-center gap-2 text-xs text-[#2e5c55]/60 mt-1">
                                        <span className="font-bold bg-[#2e5c55]/5 px-2 py-0.5 rounded text-[#2e5c55]">{item.day}</span>
                                        <span>at {item.time}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {item.meditationId && (
                                        <Link to={`/meditation-session/${item.meditationId}`} className="p-2 bg-white rounded-full text-[#2e5c55] opacity-0 group-hover:opacity-100 transition-all shadow-sm transform translate-x-2 group-hover:translate-x-0">
                                            <ArrowRight size={16} />
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-2 bg-white rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-50 transform translate-x-2 group-hover:translate-x-0"
                                        title="Delete Schedule"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeeklyPlanner;
