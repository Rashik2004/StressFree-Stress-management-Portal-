import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Moon, AlertCircle, Smile } from 'lucide-react';

const situations = [
  { title: "Exam Stress", tag: "exams", icon: BookOpen, color: "bg-accent", iconColor: "text-primary" },
  { title: "Work Pressure", tag: "work", icon: Briefcase, color: "bg-primary", iconColor: "text-primary-foreground" },
  { title: "Better Sleep", tag: "sleep", icon: Moon, color: "bg-primary/80", iconColor: "text-accent" },
  { title: "Anxiety SOS", tag: "anxiety", icon: AlertCircle, color: "bg-accent/80", iconColor: "text-primary" },
  { title: "Emotional Balance", tag: "emotional", icon: Smile, color: "bg-background", iconColor: "text-primary" },
  // New Categories
  { title: "Morning Kickstart", tag: "energy", icon: BookOpen, color: "bg-primary/40", iconColor: "text-primary" }, // Using placeholder icon
  { title: "Mental Fatigue", tag: "focus", icon: Briefcase, color: "bg-accent/40", iconColor: "text-primary" }
];

import { Link } from 'react-router-dom';

const MeditationBySituation = () => {
  return (
    <section className="py-20 bg-surface border-y border-primary/5 transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">Meditation by Situation</h2>
            <p className="text-primary/70">Specific sessions for specific challenges.</p>
          </div>
          <Link to="/meditations" className="text-primary font-bold underline hover:text-accent transition-colors">
            View All Categories
          </Link>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          {situations.map((situation, index) => (
            <Link key={index} to={`/meditations/tag/${situation.tag}`}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 pl-2 pr-6 py-2 bg-surface border border-primary/10 rounded-full shadow-sm hover:shadow-md transition-all group"
                >
                  <div className={`w-10 h-10 rounded-full ${situation.color} flex items-center justify-center`}>
                    <situation.icon size={18} className={situation.iconColor || "text-primary"} />
                  </div>
                  <span className="font-bold text-primary">{situation.title}</span>
                </motion.button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeditationBySituation;
