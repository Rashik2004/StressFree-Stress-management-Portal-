import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, BookOpen, Compass, Star, Sparkles } from 'lucide-react';

const MeditationHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section ref={containerRef} className="relative pt-40 pb-0 min-h-screen bg-surface overflow-hidden flex flex-col items-center transition-colors duration-500">

      {/* 1. Giant Background Outline Text (Decorative) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none z-0">
         <h1 className="text-[15vw] md:text-[20vw] font-serif font-black text-transparent text-center leading-none tracking-tighter opacity-10"
             style={{ WebkitTextStroke: '4px var(--primary)' }}>
            BREATHE
         </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full flex-grow flex flex-col">

        {/* 2. Top Navigation / Brand Header Area (Conceptual space) */}
        <div className="text-center mb-8 md:mb-12">
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-6xl md:text-[8rem] font-serif text-primary leading-[0.9] tracking-tight"
            >
                Meditation
            </motion.h1>
             <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl font-serif italic text-accent mt-2"
            >
                for Stress Relief
            </motion.p>
        </div>

        {/* 3. Main Content Split */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 flex-grow">

            {/* Left Content */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:w-1/3 text-center lg:text-left order-2 lg:order-1"
            >
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                    <div className="h-[1px] w-12 bg-primary/30"></div>
                    <span className="text-sm font-bold uppercase tracking-widest text-primary/60">The Energy of Life</span>
                </div>

                <p className="text-lg text-primary/80 leading-relaxed font-medium mb-10">
                    Discover a sanctuary for your mind. Simple, effective practices to reduce stress and improve emotional balance—designed for modern life.
                </p>

                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
                    <button
                        onClick={() => document.getElementById('meditation-categories')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group cursor-pointer"
                    >
                        <span className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                            <Play size={16} fill="currentColor" />
                        </span>
                        Lets Start
                    </button>
                    <a href="#beginners-guide" className="px-8 py-4 bg-transparent border-2 border-primary/10 text-primary rounded-full font-bold hover:bg-primary/5 transition-all text-sm uppercase tracking-wide flex items-center justify-center">
                        Explore Guide
                    </a>
                </div>
            </motion.div>

            {/* Center/Right Visualization (The Arch) */}
            <motion.div
                className="lg:w-1/3 relative order-1 lg:order-2"
                style={{ y }}
            >
                {/* The Arch Shape */}
                <div className="relative w-full max-w-sm mx-auto aspect-[3/4]">
                     {/* Decorative Rotating Badge */}
                    <div className="absolute -top-6 -right-6 z-20 animate-spin-slow">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent flex items-center justify-center relative border-4 border-surface shadow-lg">
                             <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 animate-spin-reverse-slower p-2 opacity-50">
                                <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                                <text>
                                    <textPath href="#curve" className="text-[13px] font-bold uppercase tracking-widest fill-primary">
                                        • Mindfulness • Clarity • Peace •
                                    </textPath>
                                </text>
                            </svg>
                            <Sparkles size={32} className="text-primary" strokeWidth={1.5} />
                        </div>
                    </div>

                    <div className="w-full h-full bg-background rounded-t-[10rem] relative overflow-hidden border-8 border-surface shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=2072&auto=format&fit=crop"
                            alt="Meditation"
                            className="w-full h-full object-cover object-bottom"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent mix-blend-multiply" />
                    </div>


                </div>
            </motion.div>

            {/* Right Decorative/Context */}
             <motion.div
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8, delay: 0.4 }}
                 className="lg:w-1/3 hidden lg:flex flex-col justify-center items-end text-right order-3"
            >
                <div className="mb-16">
                     <h3 className="text-4xl font-bold font-serif text-primary mb-3">Inner Peace</h3>
                     <p className="text-lg text-primary/70 max-w-[260px] leading-relaxed">Cultivate a state of calm that stays with you all day.</p>
                </div>
                 <div>
                     <h3 className="text-4xl font-bold font-serif text-primary mb-3">Daily Growth</h3>
                     <p className="text-lg text-primary/70 max-w-[260px] leading-relaxed">Track your journey and see your mind evolve.</p>
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MeditationHero;
