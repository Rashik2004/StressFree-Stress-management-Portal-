import React, { useState } from 'react';
import ProfileSubPage from './ProfileSubPage';

const Preferences = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ProfileSubPage title="Preferences">
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 border border-primary/10 rounded-xl">
             <div>
                 <h4 className="font-bold text-primary">Email Notifications</h4>
                 <p className="text-xs text-primary/60">Receive weekly progress reports</p>
             </div>
             <button
               onClick={() => setNotifications(!notifications)}
               className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-primary' : 'bg-primary/20'}`}
             >
                 <div className={`w-4 h-4 bg-surface rounded-full absolute top-1 transition-all ${notifications ? 'left-7' : 'left-1'}`} />
             </button>
        </div>

        <div className="flex items-center justify-between p-4 border border-primary/10 rounded-xl">
             <div>
                 <h4 className="font-bold text-primary">Dark Mode</h4>
                 <p className="text-xs text-primary/60">Easier on the eyes at night</p>
             </div>
             <button
               onClick={() => setDarkMode(!darkMode)}
               className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-primary' : 'bg-primary/20'}`}
             >
                 <div className={`w-4 h-4 bg-surface rounded-full absolute top-1 transition-all ${darkMode ? 'left-7' : 'left-1'}`} />
             </button>
        </div>

        <div className="pt-4 border-t border-primary/10">
            <h4 className="font-bold text-primary mb-4">Personalization</h4>
            <button className="text-primary font-bold text-sm hover:underline">Retake Onboarding Questionnaire &rarr;</button>
        </div>
      </div>
    </ProfileSubPage>
  );
};

export default Preferences;
