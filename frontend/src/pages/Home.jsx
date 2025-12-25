import React from 'react';

import EmotionalHooksSection from '../components/Home/EmotionalHooksSection';
import HowItWorks from '../components/Home/HowItWorks';
import HeroSection from '../components/Home/HeroSection';
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

      <HeroSection />

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
