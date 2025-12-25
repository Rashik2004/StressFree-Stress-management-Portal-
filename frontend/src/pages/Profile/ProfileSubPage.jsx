import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ProfileSubPage = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-12 pt-24 md:pt-12 md:pl-20 transition-colors duration-500">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 bg-surface rounded-full shadow-sm hover:bg-background transition-colors">
            <ArrowLeft size={20} className="text-primary" />
          </button>
          <h1 className="text-2xl font-bold text-primary">{title}</h1>
        </div>

        <div className="bg-surface rounded-3xl p-6 md:p-8 shadow-sm border border-primary/5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileSubPage;
