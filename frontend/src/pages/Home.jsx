import React from 'react';
import { Link } from 'react-router-dom';
import LandingImage from '../assets/images/Mindfulness-bro.svg';
import EmotionalHooksSection from '../components/Home/EmotionalHooksSection';
import HowItWorks from '../components/Home/HowItWorks';
import FeaturesBenefits from '../components/Home/FeaturesBenefits';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import FAQSection from '../components/Home/FAQSection';
import CTASection from '../components/Home/CTASection';
import FeedbackSection from '../components/Home/FeedbackSection';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Home = () => {
    const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="home-page min-h-screen bg-primary font-sans transition-colors duration-500">

      <div className="relative overflow-hidden">
        <div className="relative pt-32 pb-20 px-8 container mx-auto flex flex-col items-center justify-center min-h-screen">

          <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none select-none">
            <h1 className="text-6xl md:text-[10rem] lg:text-[16rem] font-black text-background leading-[0.85] tracking-tighter opacity-10 font-serif">
              Find Your <br /> Calm Daily
            </h1>
          </div>

          <div className="relative z-10 w-full px-4 flex justify-between items-center mt-[-4rem]">

            <div className="w-[25%] flex flex-col gap-6 text-primary-foreground mt-100">
              <p className="text-xl leading-relaxed opacity-90 ">
                Experience true peace of mind with guided meditations crafted from passion and tradition.
              </p>
              <Link to="/meditations" className="bg-accent text-primary px-8 py-4 rounded-2xl font-bold text-lg w-fit hover:opacity-90 transition-all shadow-lg">
                Start Meditating
              </Link>
            </div>

            <div className="w-[40%] flex justify-center relative translate-y-32">
              <div className="w-[650px] h-[750px] flex items-center justify-center relative overflow-visible">
                  <img src={LandingImage} alt="Central Figure" className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl" />
              </div>
            </div>

            <div className="w-[25%] flex flex-col justify-end items-end mt-96">
              <div className="bg-surface p-4 rounded-3xl w-64 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-primary/10">
                  <div className="h-40 bg-primary/10 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden">
                      <img src={LandingImage} alt="Central Figure" className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl" />
                  </div>
                  <h3 className="text-primary font-bold text-xl mb-1">Daily Streak</h3>
                  <p className="text-primary/70 text-sm mb-4">Keep your mindfulness journey going.</p>
                  <Link to="/dashboard" className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
                    Check Progress
                  </Link>
              </div>
            </div>

          </div>

        </div>
      </div>

      <EmotionalHooksSection />

      <HowItWorks />

      <FeaturesBenefits />

      <TestimonialsSection />

      <FAQSection />



      {isAuthenticated ? <FeedbackSection /> : <CTASection />}

    </div>
  );
};

export default Home;
