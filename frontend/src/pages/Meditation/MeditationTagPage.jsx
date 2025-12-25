
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Sparkles } from 'lucide-react';
import Loader from '../../components/Common/Loader';
import api from '../../services/api';

const MeditationTagPage = () => {
    const { tag } = useParams();
    const [pageData, setPageData] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchByTag = async () => {
            try {
                // Using the new tag endpoint
                const res = await api.get(`/meditations/tag/${tag}`);

                // The backend returns { _id, title, description, sessions: [] }
                setPageData(res.data);
                setSessions(res.data.sessions || []);
            } catch (err) {
                console.error("Error fetching tag sessions:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchByTag();
    }, [tag]);

    if(loading) return <div className="min-h-screen flex items-center justify-center bg-[#fafbf6]"><Loader /></div>;

    // If no data or empty sessions, show a friendly empty state
    if(!pageData || sessions.length === 0) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafbf6] text-[#1c1c1c]">
            <h2 className="text-3xl font-sans mb-4">Finding Calm...</h2>
            <p className="text-[#1c1c1c]/60 mb-8">No specific sessions found for "{tag}" yet.</p>
            <Link to="/meditations" className="text-[#2e5c55] underline">Browse all categories</Link>
        </div>
    );

    // --- UI Components (Reused from Category Page for consistency) ---

    const TextCard = ({ session }) => (
        <Link to={`/meditation-session/${session._id}`} className="block h-full min-h-[320px] group">
            <div className="relative h-full bg-white rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between border border-[#2e5c55]/5 hover:border-[#2e5c55]/20 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#fafbf6] rounded-bl-[2.5rem] z-10 pointer-events-none"></div>
                <div className="absolute top-5 right-5 z-20">
                     <div className="w-10 h-10 rounded-full border border-[#2e5c55]/20 flex items-center justify-center text-[#2e5c55]">
                        <Sparkles size={16} strokeWidth={1.5} />
                     </div>
                </div>

                <div className="relative z-0 mt-4">
                     <span className="inline-block px-5 py-2 rounded-full border border-[#1c1c1c]/10 text-[#1c1c1c]/70 text-sm font-light mb-8">
                        {session.duration ? `${Math.floor(session.duration / 60)} mins` : '5-10 mins'}
                     </span>
                     <h3 className="text-3xl md:text-4xl font-sans font-medium tracking-tighter text-[#1c1c1c] leading-[1.1] mb-4 group-hover:text-[#2e5c55] transition-colors">
                        {session.title}
                     </h3>
                     <p className="text-[#1c1c1c]/60 text-lg leading-relaxed">
                        {session.description}
                     </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1c1c1c]/5 flex items-center gap-2 text-[#1c1c1c]/40 text-xs font-bold uppercase tracking-widest">
                    {session.tags && session.tags.slice(0, 2).join(' • ')}
                </div>
            </div>
        </Link>
    );

    const ImageCard = ({ session }) => (
        <Link to={`/meditation-session/${session._id}`} className="block h-full min-h-[320px] group">
            <div className="relative h-full rounded-[2.5rem] overflow-hidden">
                <img
                    src={session.imageUrl}
                    alt={session.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:bg-white group-hover:text-[#2e5c55] group-hover:scale-110 transition-all duration-300">
                         <Play size={24} fill="currentColor" className="ml-1"/>
                    </div>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="min-h-screen bg-[#fafbf6] font-sans p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 pt-8 text-center max-w-3xl mx-auto">
                    <Link to="/meditations" className="inline-flex items-center text-[#1c1c1c]/40 hover:text-[#1c1c1c] font-medium mb-8 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back to All
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-sans font-medium tracking-tighter text-[#1c1c1c] mb-6 capitalize">
                        {pageData.title}
                    </h1>
                    <p className="text-xl text-[#1c1c1c]/60 font-light leading-relaxed">
                        {pageData.description}
                    </p>
                </div>

                <div className="flex flex-col gap-12 md:gap-20 pb-20">
                    {sessions.map((session, index) => {
                         const isTextLeft = index % 2 === 0;
                         return (
                             <div key={session._id} className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[400px]">
                                {isTextLeft ? (
                                    <>
                                        <div className="order-1 md:order-1 h-full"><TextCard session={session} /></div>
                                        <div className="order-2 md:order-2 h-full"><ImageCard session={session} /></div>
                                    </>
                                ) : (
                                    <>
                                        <div className="order-2 md:order-1 h-full"><ImageCard session={session} /></div>
                                        <div className="order-1 md:order-2 h-full"><TextCard session={session} /></div>
                                    </>
                                )}
                             </div>
                         );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MeditationTagPage;
