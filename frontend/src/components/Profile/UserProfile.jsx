import React, { useState } from 'react';

const UserProfile = () => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://via.placeholder.com/150',
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.avatar} alt="Profile" className="avatar" />
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      {/* Additional profile details */}
    </div>
  );
};

export default UserProfile;
