
import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import dashboardService from '../../features/dashboardService';

const ReminderManager = () => {
    const { user } = useContext(AuthContext);
    const [schedule, setSchedule] = useState([]);

    // Request Notification Permission on mount
    useEffect(() => {
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);

    // Fetch Schedule
    useEffect(() => {
        const fetchSchedule = async () => {
            if (user && user.token) {
                try {
                    const data = await dashboardService.getSchedule(user.token);
                    setSchedule(data);
                } catch (error) {
                    console.error("Failed to fetch schedule for reminders", error);
                }
            }
        };

        fetchSchedule();
        const interval = setInterval(fetchSchedule, 60000 * 5); // Refresh every 5 mins
        return () => clearInterval(interval);
    }, [user]);

    // Check for Reminders every minute
    useEffect(() => {
        const checkReminders = () => {
             if (!schedule || schedule.length === 0) return;

             const now = new Date();
             const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
             const currentDay = days[now.getDay()];
             const hours = now.getHours().toString().padStart(2, '0');
             const minutes = now.getMinutes().toString().padStart(2, '0');
             const currentTime = `${hours}:${minutes}`;

             schedule.forEach(item => {
                 if (item.day === currentDay && item.time === currentTime && !item.completed) {
                     // Check if we already notified for this today?
                     // For simplicity, we just notify.
                     // In a real app, we'd track "lastNotified" in local storage to prevent double alerts if component remounts.

                     if (Notification.permission === "granted") {
                         new Notification(`Time to Meditate: ${item.title}`, {
                             body: `It's ${currentTime}. Take a moment for yourself.`,
                             icon: "/logo192.png" // Assuming logo exists, or default
                         });
                     } else {
                         // Fallback to alert if no permission (optional, might be annoying)
                         // alert(`Time to Meditate: ${item.title}`);
                     }
                 }
             });
        };

        // Check immediately and then every minute
        // Align to minute start for better accuracy?
        const now = new Date();
        const delay = (60 - now.getSeconds()) * 1000;

        const timeout = setTimeout(() => {
            checkReminders();
            const interval = setInterval(checkReminders, 60000);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [schedule]);

    return null; // Invisible component
};

export default ReminderManager;
