import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, CheckCircle, Volume2, SkipBack, SkipForward, Info, Activity, Calendar, Clock } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import dashboardService from '../../features/dashboardService';
import { ThemeContext } from '../../context/ThemeContext';

const MeditationPlayerPage = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    // Timer & Player State
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [volume, setVolume] = useState(0.5);

    // Schedule State
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [scheduleDay, setScheduleDay] = useState("Mon");
    const [scheduleTime, setScheduleTime] = useState("08:00");
    const [isScheduling, setIsScheduling] = useState(false);
    const [scheduleSuccess, setScheduleSuccess] = useState(false);

    // Audio Ref
    const audioRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await axios.get(`/api/meditations/session/${sessionId}`);
                setSession(res.data);
                setTimeLeft(res.data.duration);
            } catch (err) {
                console.error("Error fetching session:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSession();

        return () => {
            clearInterval(timerRef.current);
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, [sessionId]);

    // Audio Control Effect
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            if (isActive) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("Audio Playback Error:", error);
                        // Auto-pause if playback fails (e.g. user interaction required)
                        setIsActive(false);
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isActive, volume, session]);

    // Timer Logic
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            setIsCompleted(true);
            clearInterval(timerRef.current);
            if (audioRef.current) audioRef.current.pause();

            if (user && user.token) {
                dashboardService.updateStats({
                    sessionId: session._id,
                    duration: session.duration
                }, user.token).catch(err => console.error("Stats update failed", err));
            }
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft, user, session]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setIsCompleted(false);
        setTimeLeft(session?.duration || 0);
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.pause();
        }
    };

    const handleSchedule = async (e) => {
        e.preventDefault();
        if (!user || !user.token) return;

        setIsScheduling(true);
        try {
            await dashboardService.addSchedule({
                title: session.title,
                time: scheduleTime,
                day: scheduleDay,
                meditationId: session._id
            }, user.token);
            setScheduleSuccess(true);
            setTimeout(() => {
                setShowScheduleModal(false);
                setScheduleSuccess(false);
            }, 3000);
        } catch (error) {
            console.error("Scheduling failed", error);
            alert("Failed to schedule session: " + (error.response?.data?.message || "Unknown error"));
            setIsScheduling(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-background flex items-center justify-center transition-colors duration-500">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!session) return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-primary gap-4 transition-colors duration-500">
           <Activity size={48} className="text-red-500" />
           <p className="text-xl font-serif">Session Not Found</p>
           <button onClick={() => navigate(-1)} className="text-accent underline">Return</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-background text-text-main font-sans relative overflow-hidden flex flex-col items-center justify-center transition-colors duration-500">

            {/* Audio Element */}
            {session.audioUrl && (
                <audio ref={audioRef} src={session.audioUrl} loop />
            )}
            {/* Fallback for no audio (silent timer) */}

            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-background opacity-90 transition-colors duration-500"></div>
                <img src={session.imageUrl} alt="Ambient" className="w-full h-full object-cover opacity-20 blur-sm" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent animate-pulse"></div>
            </div>

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
                <button onClick={() => navigate(-1)} className="p-3 bg-surface border border-primary/10 rounded-full hover:bg-surface/80 transition-all hover:scale-105 group shadow-sm">
                    <X size={20} className="text-primary group-hover:text-accent transition-colors" />
                </button>
                <div className="flex gap-2">
                     {session.tags?.slice(0, 3).map((tag, i) => (
                         <span key={i} className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-surface/50 border border-primary/10 text-primary/70 rounded-full backdrop-blur-md">
                             {tag}
                         </span>
                     ))}
                </div>
            </div>

            {/* Main Player UI */}
            <div className="relative z-10 w-full max-w-lg px-6">
                <AnimatePresence mode="wait">
                    {!isCompleted ? (
                        <motion.div
                            key="player"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center"
                        >
                            {/* Futuristic Visualizer (Theme Aware) */}
                            <div className="h-24 flex items-end gap-1 mb-8">
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-2 bg-gradient-to-t from-primary to-accent rounded-t-full opacity-60"
                                        style={{
                                            height: isActive ? `${Math.random() * 100}%` : '5px',
                                            animation: isActive ? `musicBar ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate` : 'none',
                                            transition: 'height 0.3s ease'
                                        }}
                                    ></div>
                                ))}
                            </div>

                            {/* Title & Info */}
                            <div className="text-center mb-10">
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-2">
                                    {session.category?.title}
                                </h2>
                                <h1 className="text-4xl md:text-5xl font-serif text-primary drop-shadow-sm mb-4">
                                    {session.title}
                                </h1>
                                {!session.audioUrl && (
                                     <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full mb-2">(Silent Session)</span>
                                )}
                            </div>

                            {/* Timer Ring */}
                            <div className="relative w-64 h-64 mb-12 group">
                                <div className="absolute inset-0 rounded-full border-4 border-primary/5"></div>
                                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                     <circle cx="50%" cy="50%" r="48%" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-primary/10" />
                                     <circle
                                        cx="50%" cy="50%" r="48%"
                                        stroke="currentColor" strokeWidth="4"
                                        fill="transparent"
                                        strokeDasharray={`${2 * Math.PI * 48}%`}
                                        strokeDashoffset={`${2 * Math.PI * 48 * (1 - timeLeft / session.duration)}%`}
                                        strokeLinecap="round"
                                        className="text-accent transition-all duration-1000 ease-linear"
                                     />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-6xl font-mono font-bold tracking-tighter text-primary tabular-nums">
                                        {formatTime(timeLeft)}
                                    </span>
                                    {isActive && <span className="text-xs text-accent animate-pulse mt-2">● NOW PLAYING</span>}
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-8">
                                <button onClick={resetTimer} className="p-4 rounded-full bg-surface border border-primary/10 hover:bg-primary/5 transition-all group">
                                    <RotateCcw size={20} className="text-primary/70 group-hover:text-primary" />
                                </button>

                                <button
                                    onClick={toggleTimer}
                                    className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 hover:scale-105 transition-all active:scale-95"
                                >
                                    {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                                </button>

                                <button onClick={() => setShowInfo(!showInfo)} className="p-4 rounded-full bg-surface border border-primary/10 hover:bg-primary/5 transition-all group">
                                    <Info size={20} className="text-primary/70 group-hover:text-primary" />
                                </button>

                                <button onClick={() => setShowScheduleModal(true)} className="p-4 rounded-full bg-surface border border-primary/10 hover:bg-primary/5 transition-all group" title="Schedule Routine">
                                    <Calendar size={20} className="text-primary/70 group-hover:text-primary" />
                                </button>
                            </div>

                            {/* Volume Control (Only if audio exists) */}
                            {session.audioUrl && (
                                <div className="mt-8 flex items-center gap-4 w-full max-w-xs">
                                    <Volume2 size={16} className="text-primary/50" />
                                    <input
                                        type="range"
                                        min="0" max="1" step="0.01"
                                        value={volume}
                                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                                        className="w-full h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>
                            )}

                            {/* Info/Instructions Panel */}
                            <AnimatePresence>
                                {showInfo && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-8 w-full bg-surface/50 backdrop-blur-md border border-primary/10 rounded-2xl p-6 overflow-hidden"
                                    >
                                        <h3 className="text-xs font-bold uppercase text-primary/50 mb-2">Instructions</h3>
                                        <ul className="space-y-2 text-sm text-primary/80 font-medium">
                                            {session.instructions.map((step, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <span className="text-accent font-bold">0{i + 1}</span> {step}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    ) : (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-surface rounded-3xl p-12 max-w-lg w-full text-center border border-primary/10 shadow-xl"
                        >
                            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                                <CheckCircle size={40} className="text-primary" />
                            </div>
                            <h2 className="text-3xl font-bold text-primary mb-4">Session Complete!</h2>
                             <p className="text-primary/70 mb-8 font-medium">
                                You've successfully completed this session.<br/>
                                <span className="text-accent text-sm">Stats Saved.</span>
                            </p>
                            <button
                                onClick={() => navigate(-1)}
                                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors"
                            >
                                Return to Library
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Schedule Modal */}
            <AnimatePresence>
                {showScheduleModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative"
                        >
                            <button
                                onClick={() => { setShowScheduleModal(false); setScheduleSuccess(false); }}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>

                            <AnimatePresence mode="wait">
                                {scheduleSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="text-center py-8"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                            className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                                        >
                                            <CheckCircle size={40} />
                                        </motion.div>
                                        <h3 className="text-3xl font-bold text-[#2e5c55] mb-2">Yay! Scheduled!</h3>
                                        <p className="text-gray-500 font-medium">Your session is saved for {scheduleDay} at {scheduleTime}.</p>
                                    </motion.div>
                                ) : (
                                    <motion.div key="form">
                                        <div className="text-center mb-6">
                                            <Calendar className="w-12 h-12 text-[#2e5c55] mx-auto mb-3" />
                                            <h3 className="text-2xl font-bold text-[#2e5c55]">Schedule Routine</h3>
                                            <p className="text-gray-500">Set a reminder for this meditation</p>
                                        </div>

                                        <form onSubmit={handleSchedule} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-[#2e5c55] mb-2">Day of Week</label>
                                                <div className="grid grid-cols-4 gap-2">
                                                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                                                        <button
                                                            key={day}
                                                            type="button"
                                                            onClick={() => setScheduleDay(day)}
                                                            className={`py-2 rounded-xl text-sm font-bold transition-all ${
                                                                scheduleDay === day
                                                                ? "bg-[#2e5c55] text-white shadow-lg scale-105"
                                                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                                            }`}
                                                        >
                                                            {day}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-[#2e5c55] mb-2">Time</label>
                                                <div className="relative">
                                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="time"
                                                        value={scheduleTime}
                                                        onChange={(e) => setScheduleTime(e.target.value)}
                                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#2e5c55] focus:outline-none font-bold text-[#2e5c55]"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isScheduling}
                                                className="w-full py-4 bg-[#2e5c55] text-white font-bold rounded-xl hover:bg-[#234842] transition-colors shadow-lg shadow-[#2e5c55]/20 disabled:opacity-50 mt-4"
                                            >
                                                {isScheduling ? "Scheduling..." : "Set Reminder"}
                                            </button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Global Keyframes for Visualizer */}
            <style>{`
                @keyframes musicBar {
                    0% { height: 10%; }
                    50% { height: 90%; }
                    100% { height: 30%; }
                }
            `}</style>
        </div>
    );
};

export default MeditationPlayerPage;
