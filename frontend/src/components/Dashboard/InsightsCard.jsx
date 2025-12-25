
import React from 'react';
import { Lightbulb } from 'lucide-react';

const InsightsCard = () => {
    return (
        <div className="bg-[#e8f5e9] rounded-[2rem] p-6 border border-[#2e5c55]/5 flex flex-col h-full justify-center">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-white text-[#2e7d32] rounded-full shadow-sm">
                    <Lightbulb size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-[#2e7d32] mb-1">Weekly Insight</h4>
                    <p className="text-[#2e7d32]/80 text-sm leading-relaxed">
                        "Your average mood is higher on days when you meditate at least 10 minutes in the morning."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InsightsCard;
