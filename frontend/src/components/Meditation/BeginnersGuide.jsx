import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, XCircle, CheckCircle, Clock } from 'lucide-react';

const BeginnersGuide = () => {
  return (
    <section id="beginners-guide" className="py-24 bg-surface relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Beginner’s Guide to Meditation
          </h2>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            New to meditation? Here’s everything you need to know to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* What is Meditation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-3xl p-8 md:p-10 border border-primary/5"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary">
                <HelpCircle size={24} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-primary">What Is Meditation?</h3>
            </div>
            <p className="text-lg text-primary/80 leading-relaxed mb-6">
              Meditation is the practice of focusing your attention on the present moment. It helps you become aware of your thoughts, emotions, and breathing without reacting to them.
            </p>
            <div className="space-y-3">
               <h4 className="font-bold text-primary flex items-center gap-2">
                 <XCircle size={20} className="text-red-400" /> What Meditation Is NOT
               </h4>
               <ul className="pl-9 space-y-2 text-primary/70">
                 <li>• It does not require you to stop thinking</li>
                 <li>• It is not religious or spiritual</li>
                 <li>• It does not require special equipment</li>
               </ul>
            </div>
          </motion.div>

          {/* How to Prepare */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
             {/* Abstract circle decoration */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-full bg-surface/10 flex items-center justify-center text-accent">
                <CheckCircle size={24} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold">How to Prepare</h3>
            </div>

            <ul className="space-y-4 mb-8 relative z-10">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xs mt-1">1</span>
                <span><strong className="text-primary-foreground">Place:</strong> Sit comfortably on a chair or floor.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xs mt-1">2</span>
                <span><strong className="text-primary-foreground">Posture:</strong> Keep your back straight but relaxed.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xs mt-1">3</span>
                <span><strong className="text-primary-foreground">Eyes:</strong> Close your eyes or soften your gaze.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xs mt-1">4</span>
                <span><strong className="text-primary-foreground">Breath:</strong> Breathe naturally.</span>
              </li>
            </ul>

            <div className="bg-surface/10 rounded-xl p-4 relative z-10">
               <h4 className="font-bold text-accent mb-1 flex items-center gap-2">
                 <Clock size={16} /> How Long?
               </h4>
               <p className="text-sm opacity-90">Start with 5 minutes. Gradually increase to 10 or 15 minutes as you feel comfortable.</p>
            </div>
          </motion.div>
        </div>

        {/* What if thoughts come */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-accent/20 rounded-3xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-primary mb-4">What If Thoughts Come?</h3>
          <p className="text-lg text-primary/80 max-w-3xl mx-auto">
            "Thoughts are natural. When your mind wanders, gently bring your attention back to your breath. This is not failure—it is part of meditation."
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default BeginnersGuide;
