import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind, Mic, Activity, Heart, Brain, Sun, Anchor, Moon, Music, CloudRain, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const iconMap = {
  Brain, Wind, Activity, Mic, Heart, Sun, Anchor, Moon, Music, CloudRain, Headphones
};

import api from '../../services/api';

const MeditationTypes = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/meditations/categories');
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div className="py-24 text-center text-primary">Loading Types...</div>;

  return (
    <section id="meditation-categories" className="py-24 bg-background transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Explore Meditation Types
          </h2>
          <p className="text-xl text-primary/70">
            Find the practice that resonates with your needs today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((type, index) => {
            const IconComponent = iconMap[type.iconName] || Brain;

            return (
                <motion.div
                key={type._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-primary/5 flex flex-col h-full"
                >
                <div className={`w-14 h-14 rounded-2xl ${type.color} flex items-center justify-center mb-6`}>
                    <IconComponent size={28} className={type.textColor || "text-primary"} />
                </div>

                <h3 className="text-2xl font-bold text-primary mb-3">{type.title}</h3>
                <p className="text-primary/80 mb-6 flex-grow leading-relaxed">
                    {type.description}
                </p>

                <div className="pt-6 border-t border-primary/10 bg-surface">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary/60 bg-primary/5 px-2 py-1 rounded-md">
                            Best For: {type.bestFor}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-primary/60 bg-primary/5 px-2 py-1 rounded-md">
                            {type.durationRange}
                        </span>
                    </div>
                    <Link to={`/meditations/${type._id}`}>
                        <button className="w-full py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                        Start Session
                        </button>
                    </Link>
                </div>
                </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MeditationTypes;
