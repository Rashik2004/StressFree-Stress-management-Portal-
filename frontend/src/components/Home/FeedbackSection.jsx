import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Star, Send, User, Briefcase, MessageSquare } from 'lucide-react';
import axios from 'axios';

const FeedbackSection = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        role: '',
        quote: '',
        rating: 5,
        location: '' // Optional logic for future
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
             await api.post('/content/testimonials', {
                 ...formData,
                 image: user?.profilePicture // send profile pic if available
             });
             setSubmitted(true);
        } catch (error) {
            console.error("Error submitting feedback:", error);
            // Optionally show error toast
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="py-20 px-4 bg-background transition-colors duration-500">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="bg-surface rounded-[3rem] p-12 md:p-16 text-center text-primary relative overflow-hidden shadow-xl border border-primary/10 flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                            <Send size={40} className="text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Thank You for Sharing!</h2>
                        <p className="text-xl opacity-70 max-w-2xl mx-auto">
                            Your feedback helps us create a better experience for everyone. Your testimonial has been submitted for review.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-20 px-4 bg-background transition-colors duration-500">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="bg-primary rounded-[3rem] p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">

                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[120px] opacity-10 translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-surface rounded-full blur-[100px] opacity-10 -translate-x-1/2 translate-y-1/3" />

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

                        {/* Text Side */}
                        <div className="text-primary-foreground text-left">
                            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                                How has your <br/> journey been?
                            </h2>
                            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-md font-medium">
                                Your story inspires others. Share your experience with the Stress Management Portal and help us grow comfortably.
                            </p>

                            <div className="hidden md:flex flex-col gap-4 opacity-70">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                        <Star size={20} fill="currentColor" className="text-accent" />
                                    </div>
                                    <span>Rate your experience</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                        <MessageSquare size={20} className="text-accent" />
                                    </div>
                                    <span>Share your thoughts</span>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="bg-surface p-8 rounded-[2rem] shadow-lg border border-primary/5">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                                {/* Rating Input */}
                                <div className="flex justify-center md:justify-start gap-2 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className="transition-transform hover:scale-110 focus:outline-none"
                                        >
                                            <Star
                                                size={32}
                                                className={`transition-colors ${star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                            />
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="group relative">
                                        <User className="absolute top-4 left-4 text-primary/40 group-focus-within:text-primary transition-colors" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-background/50 px-12 py-4 rounded-xl border border-primary/10 outline-none transition-all text-primary font-medium placeholder:text-primary/40 cursor-not-allowed opacity-70"
                                            disabled
                                            required
                                        />
                                    </div>
                                    <div className="group relative">
                                        <Briefcase className="absolute top-4 left-4 text-primary/40 group-focus-within:text-primary transition-colors" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Role (e.g. Student)"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full bg-background px-12 py-4 rounded-xl border border-primary/10 outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/5 transition-all text-primary font-medium placeholder:text-primary/40"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="group relative">
                                    <textarea
                                        placeholder="What do you think about the app? Write your creative feedback here..."
                                        value={formData.quote}
                                        onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                        className="w-full bg-background px-6 py-4 rounded-xl border border-primary/10 outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/5 transition-all text-primary font-medium placeholder:text-primary/40 h-32 resize-none"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Submitting...' : (
                                        <>
                                            Submit Feedback <Send size={20} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackSection;
