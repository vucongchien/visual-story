import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login,Das,GamePlay } from '../pages';
import  {ProtectedRoute}  from './ProtectedRoute';
import { Suspense } from 'react';
import { ErrorPage } from '../pages/ErrorPage';
import { WelcomePage } from '../pages/WelcomePage';
import GoogleCallback from '../pages/Auth/GoogleCallback';

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        
        <Route path='/' element={<WelcomePage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/google/callback" element={<GoogleCallback/>}/>


        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Das/>} />
          <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
          <Route path="/admin" element={<div>Admin Page</div>} />
           <Route path="/gameplay/:id" element={<GamePlay />} />
        </Route>
        
         {/* Catch-all route for 404 */}
         <Route path="*" element={<ErrorPage />} />


      </Routes>
    </Suspense>
  );
}; 