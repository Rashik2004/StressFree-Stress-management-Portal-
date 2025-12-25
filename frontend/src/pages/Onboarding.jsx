import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { ChevronRight, Check } from 'lucide-react';

// Data Options
const STRESS_TRIGGERS = [
  'Work Pressure', 'Family Issues', 'Financial Stress', 'Health Concerns',
  'Academic Pressure', 'Relationships', 'Future Anxiety', 'Social Anxiety'
];

const RELAXATION_METHODS = [
  'Meditation', 'Deep Breathing', 'Listening to Music', 'Nature Sounds',
  'Yoga/Movement', 'Reading Stories'
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    stressTriggers: [],
    relaxationMethods: [],
    sleepHours: 7,
    meditationExperience: 'Beginner'
  });

  const { updateProfile, user } = useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user?.hasCompletedOnboarding) {
        navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleTriggerToggle = (trigger) => {
    setFormData(prev => ({
      ...prev,
      stressTriggers: prev.stressTriggers.includes(trigger)
        ? prev.stressTriggers.filter(t => t !== trigger)
        : [...prev.stressTriggers, trigger]
    }));
  };

  const handleRelaxationToggle = (method) => {
    setFormData(prev => ({
      ...prev,
      relaxationMethods: prev.relaxationMethods.includes(method)
        ? prev.relaxationMethods.filter(m => m !== method)
        : [...prev.relaxationMethods, method]
    }));
  };

  const handleSubmit = async () => {
    if (!user) return;

    // Ensure we send arrays even if empty to satisfy backend check
    const dataToSend = {
        ...formData,
        stressTriggers: formData.stressTriggers.length > 0 ? formData.stressTriggers : ['None'],
        relaxationMethods: formData.relaxationMethods.length > 0 ? formData.relaxationMethods : ['None']
    };

    const result = await updateProfile(dataToSend);
    if (result) {
        navigate('/dashboard');
    }
  };

  const nextStep = () => setStep(s => s + 1);

  // Animation variants
  const slideVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background blobs similar to Home */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#E0F2F1] rounded-full blur-[100px] opacity-60 z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#F3E5F5] rounded-full blur-[100px] opacity-60 z-0"></div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12 justify-center">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-2 rounded-full transition-all duration-500 ${step >= i ? 'w-12 bg-[#2e5c55]' : 'w-4 bg-gray-200'}`} />
          ))}
        </div>

        <AnimatePresence mode='wait'>
          {step === 1 && (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-4xl font-serif text-[#2e5c55] mb-4">What brings you here?</h1>
                <p className="text-gray-600">Select what contributes most to your stress levels.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STRESS_TRIGGERS.map(trigger => (
                  <button
                    key={trigger}
                    onClick={() => handleTriggerToggle(trigger)}
                    className={`p-4 rounded-xl text-sm font-medium transition-all duration-300 border-2 ${
                      formData.stressTriggers.includes(trigger)
                        ? 'border-[#2e5c55] bg-[#2e5c55] text-white shadow-lg transform scale-105'
                        : 'border-transparent bg-white text-gray-600 hover:border-[#2e5c55]/30'
                    }`}
                  >
                    {trigger}
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-8">
                <button
                  onClick={nextStep}
                  disabled={formData.stressTriggers.length === 0}
                  className="px-8 py-3 bg-[#2e5c55] text-white rounded-full font-medium hover:bg-[#254a44] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-4xl font-serif text-[#2e5c55] mb-4">How do you relax?</h1>
                <p className="text-gray-600">Choose methods you enjoy or want to try.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {RELAXATION_METHODS.map(method => (
                  <button
                    key={method}
                    onClick={() => handleRelaxationToggle(method)}
                    className={`p-6 rounded-xl text-sm font-medium transition-all duration-300 border-2 ${
                      formData.relaxationMethods.includes(method)
                        ? 'border-[#2e5c55] bg-[#2e5c55] text-white shadow-lg transform scale-105'
                        : 'border-transparent bg-white text-gray-600 hover:border-[#2e5c55]/30'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-8">
                <button
                  onClick={nextStep}
                  disabled={formData.relaxationMethods.length === 0}
                  className="px-8 py-3 bg-[#2e5c55] text-white rounded-full font-medium hover:bg-[#254a44] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-4xl font-serif text-[#2e5c55] mb-4">Almost there, {user?.name?.split(' ')[0]}</h1>
                <p className="text-gray-600">Help us tailor the experience to your lifestyle.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#2e5c55]/5 space-y-8">
                {/* Sleep Slider */}
                <div>
                    <div className="flex justify-between mb-4">
                        <label className="font-medium text-gray-700">Average Sleep per Night</label>
                        <span className="text-[#2e5c55] font-bold">{formData.sleepHours} Hours</span>
                    </div>
                    <input
                        type="range"
                        min="4"
                        max="12"
                        step="0.5"
                        value={formData.sleepHours}
                        onChange={(e) => setFormData({...formData, sleepHours: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2e5c55]"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>4h</span>
                        <span>12h</span>
                    </div>
                </div>

                {/* Experience Level */}
                <div>
                   <label className="font-medium text-gray-700 block mb-4">Meditation Experience</label>
                   <div className="grid grid-cols-3 gap-3">
                       {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                           <button
                             key={level}
                             onClick={() => setFormData({...formData, meditationExperience: level})}
                             className={`py-3 rounded-lg text-sm font-medium transition-all ${
                                 formData.meditationExperience === level
                                 ? 'bg-[#E0F2F1] text-[#2e5c55] border-2 border-[#2e5c55]'
                                 : 'bg-gray-50 text-gray-500 border-2 border-transparent hover:bg-gray-100'
                             }`}
                           >
                               {level}
                           </button>
                       ))}
                   </div>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={handleSubmit}
                  className="px-12 py-4 bg-[#2e5c55] text-white rounded-full font-bold text-lg hover:bg-[#254a44] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                  Personalize My Dashboard <Check size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
