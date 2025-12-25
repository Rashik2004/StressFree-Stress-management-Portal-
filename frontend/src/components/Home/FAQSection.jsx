import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

import api from '../../services/api';


import Loader from '../Common/Loader';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await api.get('/content/faqs');
        setFaqs(res.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) return <Loader className="py-24" />;

  return (
    <section className="py-24 bg-background relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">

        <div className="text-center mb-16">
          <span className="text-primary/60 font-semibold tracking-wider uppercase text-sm mb-2 block">Common Questions</span>
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
            Curious? We've got answers.
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`border-b border-primary/10 ${activeIndex === index ? 'bg-surface/80 rounded-2xl border-none shadow-sm' : 'bg-transparent'}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left py-6 px-6 flex items-center justify-between group focus:outline-none"
              >
                <span className={`text-xl font-bold transition-colors duration-300 ${activeIndex === index ? 'text-primary' : 'text-primary/80 group-hover:text-primary'}`}>
                  {faq.question}
                </span>
                <span className={`p-2 rounded-full transition-transform duration-300 ${activeIndex === index ? 'bg-primary text-primary-foreground rotate-180' : 'bg-primary/10 text-primary'}`}>
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-lg text-primary/70 leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Decorative blobs - Adjusted for subtle blend */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-surface/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

    </section>
  );
};

export default FAQSection;
