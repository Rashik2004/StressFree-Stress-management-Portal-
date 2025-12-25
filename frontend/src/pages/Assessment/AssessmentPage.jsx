
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import aiService from '../../features/aiService';
import { Brain, ArrowRight, Check, X, Loader as LoaderIcon } from 'lucide-react';

const questions = [
    {
        id: 1,
        text: "Do you often feel like you're running out of time, even when you have nothing specific to do?",
        weight: 3 // Time anxiety
    },
    {
        id: 2,
        text: "When you wake up, is your first thought about a problem you need to solve?",
        weight: 2 // Cortisol spike
    },
    {
        id: 3,
        text: "Do you find yourself scrolling on your phone without actually looking at anything?",
        weight: 1 // Dopamine seeking/numbing
    },
    {
        id: 4,
        text: "Have you recently felt detached from reality or your own body (derealization)?",
        weight: 3 // High stress/dissociation
    },
    {
        id: 5,
        text: "Do small noises or interruptions irritate you excessively?",
        weight: 2 // Sensory overload
    },
    {
        id: 6,
        text: "Do you feel guilty when you take time to rest?",
        weight: 3 // Burnout culture
    }
];

const AssessmentPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState([]); // Array of 0 or 1 (No/Yes)
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnswer = (val) => {
        const newAnswers = [...answers, val];
        setAnswers(newAnswers);

        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleSubmit(newAnswers);
        }
    };

    const handleSubmit = async (finalAnswers) => {
        setIsAnalyzing(true);
        // Fake delay for "AI" feel
        try {
            // Actual API Call
            // Convert simple Yes/No to weighted values if needed, but backend handles sum
            // Here we send raw 1 (Yes) or 0 (No) * weight?
            // Let's just send weighted array for simplicity or raw
            // For this implementation, let's send 1 for yes, 0 for no, let backend handle weights?
            // Actually our backend sums values. So let's send weighted values.

            const weightedAnswers = finalAnswers.map((ans, idx) => ans * questions[idx].weight);

            // Wait 2 seconds for effect
            await new Promise(r => setTimeout(r, 2000));

            const data = await aiService.submitAssessment(weightedAnswers, user.token);
            setResult(data);
        } catch (error) {
            console.error("AI Analysis Failed", error);
            alert("Analysis failed. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    if (result) {
        return (
            <div className="min-h-screen bg-[#f1f3e0] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-8 max-w-2xl w-full text-center shadow-xl"
                >
                    <div className="w-24 h-24 bg-[#2e5c55] rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                        <Brain size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-[#2e5c55] mb-2">Analysis Complete</h2>
                    <p className="text-gray-500 mb-8">Based on your responses, we've identified your current state.</p>

                    <div className="bg-[#f8f9fa] rounded-2xl p-6 mb-8 border border-[#2e5c55]/10">
                        <h3 className="text-xl font-bold text-[#2e5c55] mb-2">Your Archetype:</h3>
                        <h1 className="text-4xl font-black text-[#2e5c55] mb-4">{result.archetype}</h1>
                        <p className="text-gray-600">
                            {result.archetype === "The Burnout Warrior" && "You're pushing too hard. Your system is in survival mode."}
                            {result.archetype === "The Overthinker" && "Your mind is racing. You need grounding."}
                            {result.archetype === "The Busy Bee" && "You're constantly moving. Pause is power."}
                            {result.archetype === "The Zen Master" && "You are balanced. Keep it up!"}
                        </p>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="bg-[#2e5c55] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#234842] transition-colors flex items-center gap-2"
                        >
                            View My New Plan <ArrowRight size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (isAnalyzing) {
        return (
            <div className="min-h-screen bg-[#2e5c55] flex flex-col items-center justify-center text-white">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mb-8"
                >
                    <LoaderIcon size={64} />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Analyzing your psyche...</h2>
                <p className="opacity-80">Connecting data points...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f1f3e0] flex items-center justify-center p-4">
            <div className="max-w-xl w-full">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-[#2e5c55]">Psyc Check</h1>
                        <p className="text-[#2e5c55]/60">Answer honestly. No one sees this but you.</p>
                    </div>
                    <div className="text-[#2e5c55] font-bold">
                        {currentStep + 1} / {questions.length}
                    </div>
                </div>

                <div className="relative h-2 bg-gray-200 rounded-full mb-12 overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-[#2e5c55]"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        className="bg-white rounded-3xl p-8 shadow-xl min-h-[300px] flex flex-col justify-between"
                    >
                        <h2 className="text-2xl font-medium text-[#2e5c55] leading-relaxed">
                            {questions[currentStep].text}
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <button
                                onClick={() => handleAnswer(0)}
                                className="py-4 rounded-xl border-2 border-transparent bg-red-50 text-red-600 font-bold hover:border-red-200 hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                            >
                                <X size={20} /> No
                            </button>
                            <button
                                onClick={() => handleAnswer(1)}
                                className="py-4 rounded-xl border-2 border-transparent bg-green-50 text-green-600 font-bold hover:border-green-200 hover:bg-green-100 transition-all flex items-center justify-center gap-2"
                            >
                                <Check size={20} /> Yes
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AssessmentPage;
