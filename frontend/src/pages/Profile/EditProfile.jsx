import React, { useContext, useState, useRef } from 'react';
import ProfileSubPage from './ProfileSubPage';
import { AuthContext } from '../../context/AuthContext';
import { Camera } from 'lucide-react';

const EditProfile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || 'I love meditation and nature.',
    dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
    gender: user?.gender || '',
    profilePicture: user?.profilePicture || '',
    sleepHours: user?.sleepHours || 7,
    meditationExperience: user?.meditationExperience || 'Beginner'
  });

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
      try {
        await updateProfile(formData);
        alert("Profile Updated Successfully!");
      } catch (error) {
        alert("Failed to update profile. Please try again.");
      }
  };

  return (
    <ProfileSubPage title="Edit Profile">
      <div className="space-y-6">
         <div className="flex justify-center mb-6">
             <div
                onClick={triggerFileInput}
                className="w-32 h-32 rounded-full bg-background border-4 border-surface shadow-md flex items-center justify-center text-primary text-4xl font-bold relative group cursor-pointer overflow-hidden"
             >
                 {formData.profilePicture ? (
                    <img src={formData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                    user?.name?.charAt(0)
                 )}

                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Camera className="text-white" size={24} />
                 </div>
             </div>
             <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
             />
         </div>

         <div>
             <label className="block text-sm font-bold text-primary mb-2">Display Name</label>
             <input
               type="text"
               value={formData.name}
               onChange={(e) => setFormData({...formData, name: e.target.value})}
               className="w-full p-3 rounded-xl bg-background border border-primary/10 focus:border-primary outline-none text-primary"
             />
         </div>

         <div>
             <label className="block text-sm font-bold text-primary mb-2">Email</label>
             <input
               type="email"
               value={formData.email}
               disabled
               className="w-full p-3 rounded-xl bg-background/50 border border-primary/10 text-primary/50 cursor-not-allowed"
             />
         </div>

         <div className="grid grid-cols-2 gap-4">
               <div>
                   <label className="block text-sm font-bold text-primary mb-2">Date of Birth</label>
                   <input
                     type="date"
                     value={formData.dob}
                     onChange={(e) => setFormData({...formData, dob: e.target.value})}
                     className="w-full p-3 rounded-xl bg-background border border-primary/10 focus:border-primary outline-none text-primary"
                   />
               </div>
               <div>
                   <label className="block text-sm font-bold text-primary mb-2">Gender</label>
                   <select
                       value={formData.gender}
                       onChange={(e) => setFormData({...formData, gender: e.target.value})}
                       className="w-full p-3 rounded-xl bg-background border border-primary/10 focus:border-primary outline-none text-primary"
                   >
                       <option value="">Select</option>
                       <option value="Male">Male</option>
                       <option value="Female">Female</option>
                       <option value="Non-binary">Non-binary</option>
                       <option value="Prefer not to say">Prefer not to say</option>
                       <option value="Other">Other</option>
                   </select>
               </div>
          </div>

         <div>
             <label className="block text-sm font-bold text-primary mb-2">Bio</label>
             <textarea
               value={formData.bio}
               onChange={(e) => setFormData({...formData, bio: e.target.value})}
               className="w-full p-3 rounded-xl bg-background border border-primary/10 focus:border-primary outline-none h-32 resize-none text-primary"
             />
         </div>

         {/* Personalization Section */}
         <div className="pt-6 border-t border-primary/10">
            <h3 className="text-lg font-bold text-primary mb-4">Personalization</h3>

            {/* Sleep */}
            <div className="mb-4">
                <label className="block text-sm font-bold text-primary mb-2">Sleep Hours ({formData.sleepHours || 7}h)</label>
                <input
                    type="range"
                    min="4"
                    max="12"
                    step="0.5"
                    value={formData.sleepHours || 7}
                    onChange={(e) => setFormData({...formData, sleepHours: parseFloat(e.target.value)})}
                    className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
                />
            </div>

            {/* Experience */}
             <div className="mb-4">
                <label className="block text-sm font-bold text-primary mb-2">Meditation Experience</label>
                <select
                    value={formData.meditationExperience || 'Beginner'}
                    onChange={(e) => setFormData({...formData, meditationExperience: e.target.value})}
                    className="w-full p-3 rounded-xl bg-background border border-primary/10 focus:border-primary outline-none text-primary"
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>
         </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors"
          >
             Save Changes
          </button>
      </div>
    </ProfileSubPage>
  );
};

export default EditProfile;
