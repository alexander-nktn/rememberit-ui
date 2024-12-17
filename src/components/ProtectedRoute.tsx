// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';

// Define props for ProtectedRoute
interface ProtectedRouteProps {
  children: JSX.Element;
}

// Higher-order component to protect routes
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('authToken');
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
