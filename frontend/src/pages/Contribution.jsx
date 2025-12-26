import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, MessageCircle } from 'lucide-react';

const Contribution = () => {
  return (
    <div className="min-h-screen bg-background pt-24 px-6 md:px-12 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">Contribute</h1>
        <p className="text-xl text-primary/70 leading-relaxed mb-12">
          Join us in building a calmer world. Whether you are a developer, a writer, or a listener,
          your contribution matters to our community.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-surface p-8 rounded-2xl shadow-sm border border-primary/10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                    <Heart size={24} />
                </div>
                <h3 className="font-bold text-primary text-xl mb-3">Donate</h3>
                <p className="text-primary/60 mb-4">Support our servers and content creators to keep the portal free.</p>
                <button className="text-primary font-bold hover:underline">Support Us &rarr;</button>
            </div>

            <div className="bg-surface p-8 rounded-2xl shadow-sm border border-primary/10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                    <Code size={24} />
                </div>
                <h3 className="font-bold text-primary text-xl mb-3">Code</h3>
                <p className="text-primary/60 mb-4">We are Open Source! Help us build features and fix bugs on GitHub.</p>
                <a href="https://github.com/Rashik2004/StressFree-Stress-management-Portal-/tree/main" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline"><button className="text-primary font-bold hover:underline"> a View GitHub &rarr;</button></a>
            </div>

            <div className="bg-surface p-8 rounded-2xl shadow-sm border border-primary/10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                    <MessageCircle size={24} />
                </div>
                <h3 className="font-bold text-primary text-xl mb-3">Community</h3>
                <p className="text-primary/60 mb-4">Become a moderator or mentor in our support groups.</p>
                <button className="text-primary font-bold hover:underline">Join Details &rarr;</button>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contribution;
