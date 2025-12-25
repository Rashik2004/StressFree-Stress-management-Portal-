import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle, Clock } from 'lucide-react';
import Loader from '../Common/Loader';
import axios from 'axios';

const GuidedSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Get Category ID for "Guided Meditation"
                const catRes = await axios.get('/api/meditations/categories');
                const guidedCat = catRes.data.find(c => c.title === "Guided Meditation");

                if (guidedCat) {
                    setCategoryId(guidedCat._id);

                    // 2. Get Sessions for this category
                    const categoryRes = await axios.get(`/api/meditations/category/${guidedCat._id}`);
                    // Take first 4
                    setSessions(categoryRes.data.sessions.slice(0, 4));
                }
            } catch (err) {
                console.error("Error fetching guided sessions:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="py-24 flex justify-center"><Loader /></div>;
    if (!sessions.length) return null;

  return (
    <section className="py-24 bg-surface transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Guided Sessions
          </h2>
          <p className="text-xl text-primary/70">
            Press play and let the guidance lead you to calm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessions.map((session, index) => (
            <Link
              key={session._id}
              to={`/meditation-session/${session._id}`}
            >
                <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-background p-6 rounded-3xl border border-primary/5 hover:bg-surface hover:shadow-xl transition-all duration-300 flex items-center gap-6 group cursor-pointer h-full"
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

        <div className="text-center mt-12">
            <Link to={`/meditations/${categoryId}`} className="text-primary font-bold underline hover:text-accent transition-colors">
                View All Guided Sessions
            </Link>
        </div>
      </div>
    </section>
  );
};

export default GuidedSessions;
