import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { user } = useContext(AuthContext); // Can use user preferences later
    const [currentTheme, setCurrentTheme] = useState('default');
    const [isManual, setIsManual] = useState(false);

    // List of themes for UI
    const themes = [
        { id: 'default', name: '😌 Serene Green', type: 'Calm' },
        { id: 'neutral', name: '🙂 Balanced Daylight', type: 'Okay' },
        { id: 'mild', name: '😐 Gentle Focus', type: 'Mild Stress' },
        { id: 'high', name: '😟 Deep Calm', type: 'High Stress' },
        { id: 'low', name: '😔 Warm Support', type: 'Low Mood' },
        { id: 'panic', name: '😵 Minimal Grounding', type: 'Panic' },
    ];

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    // Function to set theme manually
    const setManualTheme = (themeId) => {
        setCurrentTheme(themeId);
        setIsManual(true);
    };

    // Automated Logic based on Mood/Stress
    // This function can be called by Dashboard when it receives data
    const autoSetTheme = (moodLog) => {
        if (isManual) return; // Don't override user choice

        if (!moodLog) {
            setCurrentTheme('default');
            return;
        }

        const { mood, stress } = moodLog;
        const moodLower = mood?.toLowerCase();

        // High Stress Override
        if (stress >= 8) {
            setCurrentTheme('panic');
            return;
        }
        if (stress >= 6) {
            setCurrentTheme('high');
            return;
        }

        // Mood Logic
        if (moodLower === 'terrible' || moodLower === 'bad') {
            setCurrentTheme('low');
        } else if (moodLower === 'meh' || moodLower === 'okay') {
            setCurrentTheme('neutral');
        } else if (moodLower === 'good' || moodLower === 'great') {
            setCurrentTheme('default');
        } else {
            setCurrentTheme('default');
        }
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, setManualTheme, autoSetTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};
