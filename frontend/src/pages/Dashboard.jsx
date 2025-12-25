import React, { useState, useEffect, useContext } from 'react';
import WelcomeHeader from '../components/Dashboard/WelcomeHeader';
import TodayRecommendation from '../components/Dashboard/TodayRecommendation';
import QuickActions from '../components/Dashboard/QuickActions';
import RecommendedSessionsGrid from '../components/Dashboard/RecommendedSessionsGrid';
import MoodLogger from '../components/Dashboard/MoodLogger';
import InsightsCard from '../components/Dashboard/InsightsCard';
import ProgressSummary from '../components/Dashboard/ProgressSummary';
import WeeklyPlanner from '../components/Dashboard/WeeklyPlanner';
import Sidebar from '../components/Dashboard/Sidebar';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import dashboardService from '../features/dashboardService';
import Loader from '../components/Common/Loader';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { autoSetTheme } = useContext(ThemeContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (user && user.token) {
                try {
                    const dashboardData = await dashboardService.getDashboardData(user.token);
                    setData(dashboardData);
                    // Automatically set theme based on latest summary data
                     if (dashboardData?.summary) {
                        autoSetTheme({
                            mood: dashboardData.summary.mood,
                            stress: dashboardData.summary.stress
                        });
                    }
                } catch (error) {
                    console.error("Failed to fetch dashboard data", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [user]);

    if(loading) {
        return <div className="min-h-screen bg-background flex items-center justify-center"><Loader /></div>
    }

    const summary = data?.summary || { mood: null, stress: null, minutesMeditated: 0, streak: 0 };
    const schedule = data?.schedule || [];

    return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-primary transition-colors duration-500">

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="pl-20 lg:pl-64 transition-all duration-300">
        <div className="p-4 md:p-8 max-w-7xl mx-auto pb-32">

            {/* 1. Header Section */}
            <WelcomeHeader summary={summary} />

            {/* 2. Main Bento Grid */}
            <div className="grid grid-cols-12 gap-4 lg:gap-6">

                {/* Row 1: Hero Recommendation + Mood Logger */}
                <TodayRecommendation data={data?.recommendation} />
                <div className="col-span-12 lg:col-span-4 h-full">
                    <MoodLogger onLogSuccess={() => {}} />
                </div>

                {/* Row 2: Quick Actions */}
                <QuickActions lastSession={data?.lastSession} breathingCategoryId={data?.breathingCategoryId} />

                {/* Row 3: More Suggestions + Stats */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                     <RecommendedSessionsGrid sessions={data?.suggestedSessions} />
                     <InsightsCard />
                </div>

                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                     {/* AI Assessment CTA */}
                     <div className="bg-[#2e5c55] rounded-3xl p-6 text-white relative overflow-hidden group min-h-[200px] flex flex-col justify-center">
                        <div className="absolute -top-4 -right-4 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Brain size={140} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 relative z-10">Feeling off?</h3>
                        <p className="text-white/90 text-sm mb-6 relative z-10 leading-relaxed max-w-[80%]">
                            Let our AI analyze your stress levels and build a personalized plan just for you.
                        </p>
                        <div>
                            <Link to="/assessment" className="inline-block bg-white text-[#2e5c55] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#f1f3e0] transition-colors relative z-10 shadow-lg">
                                Take Assessment
                            </Link>
                        </div>
                     </div>

                     <ProgressSummary stats={data?.stats} />
                </div>

                {/* Row 4: Weekly Planner */}
                <WeeklyPlanner schedule={schedule} dailyStats={data?.dailyStats} />

            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
