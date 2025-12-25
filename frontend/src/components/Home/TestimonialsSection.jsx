import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../Common/Loader';

import api from '../../services/api';

const TestimonialsSection = () => {
  const [activeId, setActiveId] = useState(1);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get('/content/testimonials');
        const data = res.data;
        setTestimonials(data);
        if (data.length > 0) setActiveId(data[0]._id);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();

  }, []);

  if (loading) return <div className="py-24 text-center text-primary flex justify-center"><Loader className="w-16 h-16" /></div>;

  const activeTestimonial = testimonials.find(t => t._id === activeId) || testimonials[0];

  return (
    <section className="py-24 bg-background relative overflow-hidden font-sans transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Main Split Layout */}
        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">

          {/* Left Side - Sticky/Fixed Visuals */}
          <div className="lg:w-[45%] relative flex flex-col">
            <div className="sticky top-32">
              <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 leading-tight">
                Hear From Our <br/> Satisfied Users
              </h2>

              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[3/4] shadow-2xl group w-full border border-primary/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTestimonial.image}
                    src={activeTestimonial.image}
                    alt="User Experience"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 opacity-20 ${activeTestimonial.color}`} />
                </AnimatePresence>

                {/* Stats Overlay */}
                <div className="absolute bottom-6 right-6 bg-surface/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-primary/10">
                  <span className="text-3xl font-black text-primary block leading-none">80%</span>
                  <span className="text-xs font-bold text-primary/70 tracking-wider uppercase">Calmer in 2 Weeks</span>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side - Scrollable List */}
          <div className="lg:w-[55%] flex flex-col gap-5 lg:pl-12 lg:h-[700px] lg:overflow-y-auto no-scrollbar scroll-smooth p-2">
             {testimonials.map((t) => (
              <motion.div
                key={t._id}
                onClick={() => setActiveId(t._id)}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                className={`p-8 rounded-3xl cursor-pointer transition-all duration-300 border-2 ${
                  activeId === t._id
                    ? 'bg-primary border-primary shadow-xl scale-[1.02]'
                    : 'bg-surface border-transparent hover:border-accent hover:shadow-lg'
                }`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill="currentColor"
                      className={activeId === t._id ? 'text-accent' : 'text-primary'}
                    />
                  ))}
                </div>

                <p className={`text-lg mb-6 leading-relaxed font-medium ${
                  activeId === t._id ? 'text-primary-foreground' : 'text-primary/80'
                }`}>
                  "{t.quote}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      activeId === t._id ? 'bg-surface text-primary' : 'bg-background text-primary'
                    }`}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className={`font-bold ${activeId === t._id ? 'text-primary-foreground' : 'text-primary'}`}>
                        {t.name}
                      </h4>
                      <p className={`text-sm ${activeId === t._id ? 'text-primary-foreground/70' : 'text-primary/50'}`}>
                        {t.role}
                      </p>
                    </div>
                  </div>

                  {activeId === t._id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-surface rounded-full p-2"
                    >
                      <ArrowUpRight className="text-primary" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Bottom CTA Removed - Moved to CTASection.jsx */}

      </div>
    </section>
  );
};

export default TestimonialsSection;
