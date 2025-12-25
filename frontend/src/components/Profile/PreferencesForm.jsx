import React, { useState } from 'react';

const PreferencesForm = () => {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Preferences saved', { notifications, theme });
  };

  return (
    <div className="preferences-form">
      <h3>Preferences</h3>
      <form onSubmit={handleSave}>
        <div>
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            Enable Notifications
          </label>
        </div>
        <div>
          <label>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default PreferencesForm;
