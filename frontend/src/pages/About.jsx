import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-24 px-6 md:px-12 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">About Us</h1>
        <p className="text-xl text-primary/70 leading-relaxed mb-8">
          We are dedicated to providing a safe, accessible, and personalized space for mental wellness.
          Our mission is to help you understand your stress, find relaxation, and build resilience through
          mindfulness and scientifically-backed techniques.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
                { title: 'Our Mission', desc: 'To make mental healthcare accessible to everyone.' },
                { title: 'Our Vision', desc: 'A world where stress is managed, not feared.' },
                { title: 'Our Values', desc: 'Empathy, Privacy, and Community.' }
            ].map((item, i) => (
                <div key={i} className="bg-surface p-6 rounded-2xl shadow-sm border border-primary/10">
                    <h3 className="font-bold text-primary text-xl mb-2">{item.title}</h3>
                    <p className="text-primary/70">{item.desc}</p>
                </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
