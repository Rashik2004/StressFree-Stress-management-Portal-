import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import api from '../../services/api';
import Loader from '../Common/Loader';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search');
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/meditations/search?query=${query}`);
                setSessions(res.data);
            } catch (err) {
                console.error("Search failed:", err);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    if (loading) return <div className="py-24 flex justify-center"><Loader /></div>;

    if (!sessions.length) {
        return (
            <div className="py-32 text-center">
                <h2 className="text-2xl font-bold text-primary mb-2">No results found for "{query}"</h2>
                <p className="text-primary/70">Try searching for "Sleep", "Anxiety", or "Focus".</p>
                <Link to="/meditations" className="text-accent font-bold mt-4 inline-block hover:underline">Clear Search</Link>
            </div>
        );
    }

    return (
        <section className="py-12 bg-background min-h-[60vh]">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-primary">Search Results for "{query}"</h2>
                    <p className="text-primary/70">{sessions.length} sessions found</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sessions.map((session, index) => (
                        <Link
                            key={session._id}
                            to={`/meditation-session/${session._id}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-surface p-6 rounded-3xl border border-primary/5 hover:shadow-xl transition-all duration-300 flex items-center gap-6 group cursor-pointer h-full"
                            >
                                <div className={`w-24 h-24 rounded-2xl bg-primary/10 flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden`}>
                                    {session.imageUrl ? (
                                        <img src={session.imageUrl} alt={session.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <PlayCircle size={40} className="text-primary opacity-80 group-hover:opacity-100" />
                                    )}
                                </div>

                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-primary/50 bg-primary/5 px-2 py-1 rounded">
                                            {session.duration ? Math.floor(session.duration / 60) + " min" : "10 min"}
                                        </span>
                                        {session.tags && session.tags[0] && (
                                            <span className="text-xs font-bold text-primary/50 flex items-center gap-1">
                                                #{session.tags[0]}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-accent transition-colors">{session.title}</h3>
                                    <p className="text-sm text-primary/70 leading-relaxed line-clamp-2">
                                        {session.description}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SearchResults;
