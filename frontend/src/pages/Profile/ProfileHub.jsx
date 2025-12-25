import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Settings, Sliders, Activity, Heart, Award,
  Gem, HelpCircle, MessageSquare, Shield, FileText, LogOut, ChevronRight
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const ProfileHub = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { title: 'My Profile', icon: User, path: '/profile/edit', desc: 'Personal details & bio' },
    { title: 'Account Settings', icon: Settings, path: '/profile/settings', desc: 'Password & security' },
    { title: 'Preferences', icon: Sliders, path: '/profile/preferences', desc: 'Themes & triggers' },
    { title: 'My Progress', icon: Activity, path: '/dashboard', desc: 'Stats & history' },
    { title: 'Saved Meditations', icon: Heart, path: '/profile/saved', desc: 'Favorites' },
    { title: 'Achievements', icon: Award, path: '/profile/achievements', desc: 'Badges & milestones' },
  ];

  const supportItems = [
    { title: 'Help & Support', icon: HelpCircle, path: '/faq' },
    { title: 'Feedback', icon: MessageSquare, path: '/feedback' },
    { title: 'Privacy Policy', icon: Shield, path: '/privacy' },
    { title: 'Terms of Service', icon: FileText, path: '/terms' },
  ];

  return (
    <div className="min-h-screen bg-background pb-12 pt-24 md:pt-12 md:pl-20 transition-colors duration-500">
      <div className="max-w-2xl mx-auto px-6">

        {/* Header Card */}
        <div className="bg-surface rounded-3xl p-8 mb-8 shadow-sm border border-primary/5 flex items-center gap-6">
             <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-3xl font-bold text-primary border-4 border-surface shadow-lg overflow-hidden">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user?.name?.charAt(0) || 'U'
                )}
             </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">{user?.name || 'User'}</h1>
            <p className="text-primary/70">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
              Free Plan
            </span>
          </div>
        </div>

        {/* Main Menu */}
        <div className="bg-surface rounded-3xl shadow-sm border border-primary/5 overflow-hidden mb-8">
          {menuItems.map((item, index) => (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center justify-between p-4 hover:bg-background transition-colors ${index !== menuItems.length - 1 ? 'border-b border-primary/5' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-primary">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-primary">{item.title}</h3>
                  <p className="text-xs text-primary/60">{item.desc}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-primary/30" />
            </Link>
          ))}

          {/* Refer Friend Premium */}
           <Link
              to="/premium"
              className="flex items-center justify-between p-4 bg-primary text-primary-foreground hover:opacity-95 transition-opacity"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground">
                  <Gem size={20} />
                </div>
                <div>
                  <h3 className="font-bold">Refer a Friend</h3>
                  <p className="text-xs text-primary-foreground/80">Get 1 month Premium free</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-primary-foreground/50" />
            </Link>
        </div>

        {/* CTA Upgrade */}
        <div className="mb-8">
           <button className="w-full py-4 bg-accent text-primary font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
             <Gem size={20} />
             Upgrade to Premium
           </button>
        </div>

        {/* Support Section */}
        <div className="bg-surface rounded-3xl shadow-sm border border-primary/5 overflow-hidden mb-8">
           {supportItems.map((item, index) => (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center justify-between p-4 hover:bg-background transition-colors ${index !== supportItems.length - 1 ? 'border-b border-primary/5' : ''}`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={18} className="text-primary/50" />
                <h3 className="font-medium text-primary/80">{item.title}</h3>
              </div>
               <ChevronRight size={16} className="text-primary/30" />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full p-4 bg-surface text-red-500 font-bold rounded-2xl border border-red-100 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>
    </div>
  );
};

export default ProfileHub;
