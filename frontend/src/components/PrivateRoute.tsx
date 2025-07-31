import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  const guest = sessionStorage.getItem('guest');
  const location = useLocation();

  const isPublicPage = location.pathname === '/';

  if (token) return children;

  if (guest === 'true') {
    return isPublicPage ? children : <Navigate to="/login" />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
