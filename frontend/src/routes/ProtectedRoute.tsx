import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingPage } from '../pages/LoadingPage';


export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const [minDelayPassed, setMinDelayPassed] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setMinDelayPassed(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !minDelayPassed) {
    return <LoadingPage />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};