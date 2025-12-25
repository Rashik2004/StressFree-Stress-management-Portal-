import React from 'react';
import ProfileSubPage from './ProfileSubPage';
import { Play } from 'lucide-react';

const SavedMeditations = () => {
  const savedItems = [
    { title: "Morning Clarity", duration: "10 min", category: "Focus" },
    { title: "Deep Sleep Release", duration: "20 min", category: "Sleep" },
    { title: "Anxiety SOS", duration: "5 min", category: "Stress" },
  ];

  return (
    <ProfileSubPage title="Saved Meditations">
      {savedItems.length > 0 ? (
          <div className="space-y-4">
              {savedItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-primary/10 rounded-xl hover:bg-background transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              <Play size={16} fill="currentColor" />
                          </div>
                          <div>
                              <h4 className="font-bold text-primary">{item.title}</h4>
                              <p className="text-xs text-primary/60">{item.category} • {item.duration}</p>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      ) : (
          <div className="text-center py-12">
              <p className="text-primary/40">No saved meditations yet.</p>
          </div>
      )}
    </ProfileSubPage>
  );
};

export default SavedMeditations;
