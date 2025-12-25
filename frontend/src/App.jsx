import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Meditations from './pages/Meditations';
import NotFound from './pages/NotFound';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Onboarding from './pages/Onboarding';
import About from './pages/About';
import Contribution from './pages/Contribution';
import ProfileHub from './pages/Profile/ProfileHub';
import EditProfile from './pages/Profile/EditProfile';
import Settings from './pages/Profile/Settings';
import Preferences from './pages/Profile/Preferences';
import SavedMeditations from './pages/Profile/SavedMeditations';
import MeditationCategoryPage from './pages/Meditation/MeditationCategoryPage';
import MeditationTagPage from './pages/Meditation/MeditationTagPage';
import MeditationPlayerPage from './pages/Meditation/MeditationPlayerPage';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ReminderManager from './components/Common/ReminderManager';
import Chatbot from './components/Common/Chatbot';
import AssessmentPage from './pages/Assessment/AssessmentPage';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isDashboardPage = location.pathname === '/dashboard';

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="app-container min-h-screen flex flex-col bg-background text-text-main transition-colors duration-500">
          <ReminderManager />
          <Chatbot />
          {!isDashboardPage && <Navbar />}
          <main className={`flex-grow ${isAuthPage ? '' : 'p-4'} ${isDashboardPage ? '!p-0' : ''}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />

              <Route path="/about" element={<About />} />
              <Route path="/contribution" element={<Contribution />} />
              <Route path="/meditations" element={<Meditations />} />
              <Route path="/meditations/:categoryId" element={<MeditationCategoryPage />} />
              <Route path="/meditations/tag/:tag" element={<MeditationTagPage />} />
              <Route path="/meditation-session/:sessionId" element={<MeditationPlayerPage />} />
              <Route path="/assessment" element={<AssessmentPage />} />


              <Route element={<ProtectedRoute />}>
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Profile Routes */}
                <Route path="/profile" element={<ProfileHub />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/profile/settings" element={<Settings />} />
                <Route path="/profile/preferences" element={<Preferences />} />
                <Route path="/profile/saved" element={<SavedMeditations />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {!isDashboardPage && <Footer />}
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
