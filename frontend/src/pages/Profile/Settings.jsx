import React from 'react';
import ProfileSubPage from './ProfileSubPage';

const Settings = () => {
  return (
    <ProfileSubPage title="Account Settings">
      <div className="space-y-8">
        <section>
            <h3 className="font-bold text-lg mb-4 text-primary">Security</h3>
            <div className="space-y-4">
                <button className="w-full p-4 text-left border border-primary/10 rounded-xl hover:bg-background flex justify-between items-center group transition-colors">
                    <span className="font-medium text-primary">Change Password</span>
                    <span className="text-primary text-sm font-bold group-hover:underline">Update</span>
                </button>
                <button className="w-full p-4 text-left border border-primary/10 rounded-xl hover:bg-background flex justify-between items-center group transition-colors">
                    <span className="font-medium text-primary">Two-Factor Authentication</span>
                    <span className="text-primary/50 text-sm">Disabled</span>
                </button>
            </div>
        </section>

        <section>
             <h3 className="font-bold text-lg mb-4 text-red-600">Danger Zone</h3>
             <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                 <h4 className="font-bold text-red-800 mb-1">Delete Account</h4>
                 <p className="text-sm text-red-600/80 mb-4">Permanently delete your account and all data.</p>
                 <button className="px-4 py-2 bg-surface border border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-100 text-sm transition-colors">
                     Delete Account
                 </button>
             </div>
        </section>
      </div>
    </ProfileSubPage>
  );
};

export default Settings;
