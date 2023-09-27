import React from 'react';
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteElement = ({ children, isLoggedIn, ...props }) => {
  const { path } = useLocation();

  return (
    isLoggedIn ? children : <Navigate to={path} replace/>
  )
}

export default ProtectedRouteElement;
