import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute=()=>{
  const {user } = useAuth();
  if (user === undefined||!user) {
    return <Navigate to="/login" replace />; // Show a loading spinner or message while checking auth status
  }
  return <Outlet />; // Render the protected route if authenticated
}
