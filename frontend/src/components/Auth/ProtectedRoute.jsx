import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-[#f8faef]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e5c55]"></div>
          </div>
      );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Force Onboarding if not completed and not currently on that page
  if (!user.hasCompletedOnboarding && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
