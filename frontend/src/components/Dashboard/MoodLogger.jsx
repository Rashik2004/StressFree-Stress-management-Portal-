
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Meh, Save, Check, Loader } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import dashboardService from '../../features/dashboardService';

const MoodLogger = ({ onLogSuccess }) => {
    const { user } = useContext(AuthContext);
    const [selectedMood, setSelectedMood] = useState(null);
    const [stressLevel, setStressLevel] = useState(5);
    const [saved, setSaved] = useState(false);
    const [date] = useState(new Date()); // Keep same date for instance
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!selectedMood) return;

        setLoading(true);
        try {
            await dashboardService.logMood({
                mood: selectedMood,
                stress: stressLevel,
                note: ''
            }, user.token);

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            if (onLogSuccess) onLogSuccess();
        } catch (error) {
            console.error("Failed to log mood", error);
        } finally {
            setLoading(false);
        }
    };

    const moods = [
        { icon: Smile, label: 'Great', color: 'text-green-500 bg-green-50' },
        { icon: Meh, label: 'Okay', color: 'text-yellow-500 bg-yellow-50' },
        { icon: Frown, label: 'Bad', color: 'text-red-500 bg-red-50' }
    ];

    return (
        <div id="mood-logger" className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#2e5c55]/5 flex flex-col h-full">
            <h3 className="text-xl font-bold text-[#2e5c55] mb-6">How are you feeling?</h3>

            {!saved ? (
                <>
                    {/* Mood Selector */}
                    <div className="flex justify-between gap-2 mb-8">
                        {moods.map((mood, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedMood(mood.label)}
                                className={`flex-1 py-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${selectedMood === mood.label ? 'ring-2 ring-offset-2 ring-[#2e5c55] bg-gray-50' : 'hover:bg-gray-50'}`}
                            >
                                <mood.icon size={28} className={mood.color.split(' ')[0]} />
                                <span className="text-xs font-bold text-[#2e5c55]/60 uppercase">{mood.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Stress Slider */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                             <span className="text-xs font-bold text-[#2e5c55]/60 uppercase">Stress Level</span>
                             <span className="text-xs font-bold text-[#2e5c55]">{stressLevel}/10</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={stressLevel}
                            onChange={(e) => setStressLevel(e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2e5c55]"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={loading || !selectedMood}
                        className={`w-full py-4 bg-[#2e5c55] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#234842] transition-colors ${loading ? 'opacity-70' : ''}`}
                    >
                        {loading ? <Loader size={18} className="animate-spin" /> : <Save size={18} />} Log Mood
                    </button>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                        <Check size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-[#2e5c55] mb-2">Logged!</h4>
                    <p className="text-[#2e5c55]/60">Thanks for checking in.</p>
                </div>
            )}
        </div>
    );
};

export default MoodLogger;
