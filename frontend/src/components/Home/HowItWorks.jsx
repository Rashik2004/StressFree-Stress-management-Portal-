import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: 'Create your space',
    description: 'Sign up and answer a few quick questions about your stress, sleep, and daily routine.',
  },
  {
    id: 2,
    title: 'Get your personalized plan',
    description: 'Receive a daily set of short meditations, breathing exercises, and micro‑breaks based on your profile.',
  },
  {
    id: 3,
    title: 'Practice in small pockets of time',
    description: 'Use 5–15 minute guided sessions whenever you feel stressed—on desktop or mobile.',
  },
  {
    id: 4,
    title: 'Track your progress',
    description: 'See your mood trends, streaks, and stress reduction over time in a clean dashboard.',
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background text-primary relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary/60 font-semibold tracking-wider uppercase text-sm mb-2 block">Simple & Effective</span>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-xl text-primary/80 max-w-2xl mx-auto font-light">
            A simple, science-backed path to a calmer mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-primary/10 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Geometric Step Indicator */}
              <div className="mb-8 relative">
                <div className="w-24 h-24 bg-surface rounded-2xl rotate-45 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 ease-out z-10 mx-auto">
                    <div className="w-24 h-24 absolute inset-0 bg-accent rounded-2xl -rotate-6 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500 -z-10" />
                    <span className="text-4xl font-black text-primary -rotate-45 block transform group-hover:scale-110 transition-transform duration-500">
                      {step.id}
                    </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 leading-tight min-h-[3rem]">
                {step.title}
              </h3>

              <p className="text-primary/80 leading-relaxed font-medium">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
