
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Play, Leaf, Sparkles } from 'lucide-react';
import Loader from '../../components/Common/Loader';
import api from '../../services/api';

const MeditationCategoryPage = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await api.get(`/meditations/category/${categoryId}`);
                setCategory(res.data);
                setSessions(res.data.sessions || []);
            } catch (err) {
                console.error("Error fetching category:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [categoryId]);

    if(loading) return <div className="min-h-screen flex items-center justify-center bg-background"><Loader /></div>;
    if(!category) return <div className="min-h-screen flex items-center justify-center bg-background text-primary">Category Not Found</div>;

    // --- UI Components ---

    // 1. The Notched Text Card (Matches Reference)
    // Uses a "negative space" technique: A div with the background color covers the corner to create the "cutout"
    const TextCard = ({ session }) => (
        <Link to={`/meditation-session/${session._id}`} className="block h-full min-h-[320px] group">
            <div className="relative h-full bg-surface rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between border border-primary/5 hover:border-primary/20 hover:shadow-lg transition-all duration-300 overflow-hidden">

                {/* The Notch (Top Right) */}
                {/* This div is the same color as the page bg (bg-background) to mask the surface card */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-background rounded-bl-[2.5rem] z-10 pointer-events-none transition-colors duration-500"></div>

                {/* The Icon inside the Notch */}
                <div className="absolute top-5 right-5 z-20">
                     <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary">
                        <Leaf size={16} strokeWidth={1.5} />
                     </div>
                </div>

                {/* Content */}
                <div className="relative z-0 mt-4">
                     {/* Pill Tag */}
                     <span className="inline-block px-5 py-2 rounded-full border border-primary/10 text-primary/70 text-sm font-light mb-8">
                        {session.duration ? `${Math.floor(session.duration / 60)} mins` : '5-10 mins'}
                     </span>

                     <h3 className="text-3xl md:text-4xl font-sans font-medium tracking-tighter text-primary leading-[1.1] mb-4 group-hover:text-accent transition-colors">
                        {session.title}
                     </h3>

                     <p className="text-primary/60 text-lg leading-relaxed">
                        {session.description}
                     </p>
                </div>

                {/* Bottom detail */}
                <div className="mt-8 pt-6 border-t border-primary/5 flex items-center gap-2 text-primary/40 text-xs font-bold uppercase tracking-widest">
                    {session.tags && session.tags.slice(0, 2).join(' • ')}
                </div>
            </div>
        </Link>
    );

    // 2. The Image Card (Visual Only)
    const ImageCard = ({ session }) => (
        <Link to={`/meditation-session/${session._id}`} className="block h-full min-h-[320px] group">
            <div className="relative h-full rounded-[2.5rem] overflow-hidden">
                <img
                    src={session.imageUrl}
                    alt={session.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                {/* Centered Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:bg-surface group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                         <Play size={24} fill="currentColor" className="ml-1"/>
                    </div>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="min-h-screen bg-background font-sans p-4 md:p-8 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">

                {/* Category Header */}
                <div className="mb-20 pt-8 text-center max-w-3xl mx-auto">
                    <Link to="/meditations" className="inline-flex items-center text-primary/40 hover:text-primary font-medium mb-8 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-sans font-medium tracking-tighter text-primary mb-6">{category.title}</h1>
                    <p className="text-xl text-primary/60 font-light leading-relaxed">{category.description}</p>
                </div>

                {/* The Zig-Zag List */}
                <div className="flex flex-col gap-12 md:gap-20 pb-20">
                    {sessions.map((session, index) => {
                         const isTextLeft = index % 2 === 0;

                         return (
                             <div key={session._id} className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[400px]">
                                {/*
                                    Mobile: Text always first (order-1), Image second (order-2)
                                    Desktop: Zig Zag applied via conditional rendering order
                                */}

                                {isTextLeft ? (
                                    <>
                                        <div className="order-1 md:order-1 h-full"><TextCard session={session} /></div>
                                        <div className="order-2 md:order-2 h-full"><ImageCard session={session} /></div>
                                    </>
                                ) : (
                                    <>
                                        {/* Image Left (Desktop) */}
                                        <div className="order-2 md:order-1 h-full"><ImageCard session={session} /></div>
                                        {/* Text Right (Desktop) */}
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

export default MeditationCategoryPage;
