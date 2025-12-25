import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="py-20 px-4 bg-background transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="bg-primary rounded-[3rem] p-12 md:p-16 text-center text-primary-foreground relative overflow-hidden shadow-2xl transition-colors duration-500">
                {/* Abstract Background Patterns */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-accent rounded-full blur-[100px] opacity-20 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-surface rounded-full blur-[120px] opacity-10 translate-x-1/3 translate-y-1/3" />

                <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10 text-primary-foreground">
                    Ready to take a break from constant stress?
                </h2>
                <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto mb-10 font-medium relative z-10">
                    Start with a 7‑day guided routine and see how small daily pauses can change the way you feel.
                </p>
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <Link to="/register" className="bg-surface text-primary text-lg font-bold py-4 px-10 rounded-2xl hover:bg-accent hover:text-primary transition-colors duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                    Create your free account
                    </Link>
                    <p className="text-primary-foreground/70 text-sm font-medium">
                    Takes less than 1 minute - No payment required
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CTASection;
