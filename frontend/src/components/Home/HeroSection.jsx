import React from 'react';
import { Link } from 'react-router-dom';
import LandingImage from '../../assets/images/Mindfulness-bro.svg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">

      {/* Background Text - Positioned absolutely but centered relative to container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
         <h1 className="text-[15vw] font-black text-background leading-none tracking-tighter opacity-10 font-serif text-center whitespace-nowrap">
            Find Your <br className="hidden md:block" /> Calm Daily
        </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10 translate-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

            {/* Left Content: Text & CTA */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left text-primary-foreground order-2 lg:order-1">
                <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-8 max-w-lg">
                    Experience true peace of mind with guided meditations crafted from passion and tradition.
                </p>
                <Link to="/meditations" className="bg-accent text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Start Meditating
                </Link>
            </div>

            {/* Center Content: Main Image */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2 mb-12 lg:mb-0">
                 <div className="relative w-full max-w-[600px] aspect-[4/5] flex items-center justify-center">
                    <img
                        src={LandingImage}
                        alt="Meditation Illustration"
                        className="w-full h-full object-contain drop-shadow-2xl scale-110 origin-bottom"
                    />
                 </div>
            </div>

            {/* Right Content: Streak Card */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end order-3">
                 <div className="bg-surface p-5 rounded-3xl w-60 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-primary/10">
                      <div className="h-36 bg-primary/10 rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center">
                          <img src={LandingImage} alt="Preview" className="w-full h-full object-contain opacity-80" />
                      </div>
                      <h3 className="text-primary font-bold text-lg mb-1">Daily Streak</h3>
                      <p className="text-primary/70 text-xs mb-5">Keep your mindfulness journey going.</p>
                      <Link to="/dashboard" className="block w-full bg-primary text-primary-foreground text-center py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">
                        Check Progress
                      </Link>
                 </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
