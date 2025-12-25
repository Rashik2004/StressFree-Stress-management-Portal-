import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import exhaustedImage from '../../assets/exhausted-concept.png';
import genericAppImage from '../../assets/generic-app-concept.png';
import tailoredImage from '../../assets/tailored-solution-concept.png';

const hooks = [
  {
    title: "Feeling exhausted?",
    text: "Reviewing your day only to feel overwhelmed and unable to switch off? You're not alone.",
    highlight: "exhausted",
    image: exhaustedImage
  },
  {
    title: "Generic apps don't work.",
    text: "Most stress apps throw generic content at you. They don't know what actually stresses you or how much time you really have.",
    highlight: "don't work",
    image: genericAppImage
  },
  {
    title: "Tailored to YOU.",
    text: "This portal adapts to your stress level, your schedule, and the techniques that truly work for you.",
    highlight: "Tailored",
    image: tailoredImage
  }
];

const EmotionalHooksSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative h-[450vh] bg-primary">
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden ">

        <div className="absolute inset-x-0 bottom-0 h-[85vh] bg-background flex flex-col items-center justify-center transition-colors duration-500">
             <div className="absolute -top-16 md:-top-24 left-0 w-full overflow-hidden leading-[0]">
                <svg className="relative block w-full h-16 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,120 C400,0 800,0 1200,120 V120 H0 V0" fill="var(--background)" className="transition-colors duration-500"></path>
                </svg>
             </div>

             {/* Background Graphics */}
             <div className="absolute top-[20%] left-[5%] w-64 h-64 md:w-96 md:h-96 opacity-10 pointer-events-none user-select-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="var(--primary)" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.2,22.9,71.1,34.3C60,45.7,49.1,54.9,37.3,62.1C25.5,69.3,12.7,74.5,-0.9,76.1C-14.5,77.6,-29,75.5,-41.8,68.9C-54.6,62.3,-65.7,51.2,-73.9,38.3C-82.1,25.4,-87.4,10.7,-85.7,-3C-84,-16.7,-75.3,-29.4,-64.8,-39.7C-54.3,-50,-42,-58,-29.5,-66.1C-17,-74.2,-4.3,-82.4,9.6,-85.8C23.5,-89.2,47,-87.9,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
             </div>

             <div className="absolute bottom-[20%] right-[2%] w-72 h-72 md:w-[30rem] md:h-[30rem] opacity-10 pointer-events-none user-select-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="var(--primary)" d="M41.7,-71.3C54.9,-62.9,67.1,-53.4,76.4,-41.6C85.7,-29.8,92.1,-15.7,89.9,-2.7C87.7,10.3,77,22.2,66.6,32.7C56.2,43.2,46.1,52.3,34.8,60.2C23.5,68.1,11,74.8,-2.6,79.3C-16.2,83.8,-30.9,86.1,-43.3,80.5C-55.7,74.9,-65.8,61.4,-73.4,47.2C-81,33,-86.1,18.1,-84.9,3.9C-83.7,-10.3,-76.2,-23.8,-66.3,-35.1C-56.4,-46.4,-44.1,-55.5,-31.6,-64.3C-19.1,-73.1,-6.4,-81.6,5.3,-82.8C17,-84,33.9,-77.9,41.7,-71.3Z" transform="translate(100 100)" />
                </svg>
             </div>

             <div className="absolute top-[40%] right-[10%] w-32 h-32 border-4 border-accent/20 rounded-full hidden md:block" />
             <div className="absolute bottom-[30%] left-[10%] w-24 h-24 border-4 border-primary/10 rounded-full hidden md:block" />

             <div className="relative z-10 w-full max-w-4xl px-8 text-center flex items-center justify-center h-full">
                {hooks.map((hook, index) => {
                    const prob = 1 / hooks.length;
                    const start = index * prob;
                    const end = (index + 1) * prob;
                    const mid = start + (prob / 2);

                    // Smoother transitions
                    const opacity = useTransform(scrollYProgress,
                        [start, start + 0.1, end - 0.1, end],
                        [0, 1, 1, 0]
                    );

                    const y = useTransform(scrollYProgress, [start, end], [50, -50]);
                    const imageY = useTransform(scrollYProgress, [start, end], [100, -100]); // Stronger parallax for image

                    return (
                        <motion.div
                            key={index}
                            style={{ opacity, y, position: 'absolute' }}
                            className="w-full flex flex-col items-center"
                        >
                            <h2 className="text-5xl md:text-7xl font-bold text-primary mb-6 font-serif tracking-tight">
                                {hook.title}
                            </h2>
                            <p className="text-lg md:text-3xl text-primary/80 leading-relaxed font-medium max-w-2xl mb-8">
                                {hook.text}
                            </p>

                            <motion.div
                                style={{ y: imageY }}
                                className="w-full max-w-[400px] md:max-w-[500px]"
                            >
                                <div className="bg-surface p-4 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 hover:shadow-3xl border border-primary/5">
                                    <div className="overflow-hidden rounded-2xl bg-primary/5 aspect-[4/3] relative flex items-center justify-center">
                                        <img
                                            src={hook.image}
                                            alt={hook.title}
                                            className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
             </div>
        </div>

      </div>
    </div>
  );
};

export default EmotionalHooksSection;
