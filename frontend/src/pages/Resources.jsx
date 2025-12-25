import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, FileText } from 'lucide-react';

const Resources = () => {
  const resources = [
    { title: "Understanding Stress", type: "Article", time: "5 min read", icon: FileText, color: "bg-blue-100 text-blue-600" },
    { title: "Breathing Techniques 101", type: "Video", time: "10 min watch", icon: Video, color: "bg-red-100 text-red-600" },
    { title: "The Science of Sleep", type: "Guide", time: "15 min read", icon: BookOpen, color: "bg-purple-100 text-purple-600" },
    { title: "Mindfulness at Work", type: "Article", time: "7 min read", icon: FileText, color: "bg-green-100 text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-[#f8faef] pt-24 pb-12 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-[#2e5c55] mb-4">Resources</h1>
            <p className="text-xl text-gray-600">Curated guides and articles to help you master stress management.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((res, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-[#2e5c55]/5 hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer">
                    <div className={`w-12 h-12 rounded-xl ${res.color} flex items-center justify-center mb-4`}>
                        <res.icon size={24} />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{res.type}</span>
                    <h3 className="font-bold text-[#2e5c55] text-lg mt-2 mb-2">{res.title}</h3>
                    <p className="text-xs text-gray-500">{res.time}</p>
                </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Resources;
