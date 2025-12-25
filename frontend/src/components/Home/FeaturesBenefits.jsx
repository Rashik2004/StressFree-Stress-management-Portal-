import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Trophy, Library, Shield, Gauge, Smartphone, ChevronRight } from 'lucide-react';
import api from '../../services/api';
const iconMap = {
  Brain, Trophy, Library, Shield, Gauge, Smartphone
};



const FeaturesBenefits = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await api.get('/content/features');
        setFeatures(res.data);
      } catch (error) {
        console.error('Error fetching features:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, []);

  if (loading) return <div className="py-24 text-center text-primary">Loading features...</div>;
  return (
    <section className="py-24 bg-surface text-primary relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-7xl">

        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black tracking-tight mb-6"
          >
            Enhance Your Calm <br/>
            <span className="relative inline-block">
              <span className="relative z-10">Achieve Your Goals</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-accent -z-0 rotate-1 rounded-full opacity-60"></span>
            </span>
          </motion.h2>
          <p className="text-xl text-primary/80 font-medium">
            Everything you need to manage stress, built with care and science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="flex flex-col group"
            >
              {/* Arch Shape Container */}
              <div className={`h-64 ${feature.color} rounded-t-[10rem] rounded-b-3xl mb-6 flex items-center justify-center relative overflow-hidden group-hover:shadow-xl transition-all duration-300`}>

                {/* Decorative Pattern overlay */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 to-transparent" />

                {/* Dynamic Icon */}
                {(() => {
                    const IconComponent = iconMap[feature.iconName] || Brain;
                    return (
                        <IconComponent
                        size={64}
                        className={`${feature.textColor} transform group-hover:scale-110 transition-transform duration-300`}
                        strokeWidth={1.5}
                        />
                    );
                })()}
              </div>

              <div className="px-2">
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-primary/70 leading-relaxed font-medium mb-4">
                  {feature.description}
                </p>

                {/* Additional Feature Details */}
                {feature.ctaText && (
                  <button className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all text-sm uppercase tracking-wide">
                    {feature.ctaText} <ChevronRight size={16} />
                  </button>
                )}

                {feature.statText && (
                  <div className="inline-block bg-accent/20 text-primary text-xs font-bold px-3 py-1 rounded-full mt-2">
                    {feature.statText}
                  </div>
                )}

                 {feature.quickStats && (
                  <p className="text-sm font-semibold text-primary/60 mt-2">
                    {feature.quickStats}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesBenefits;
