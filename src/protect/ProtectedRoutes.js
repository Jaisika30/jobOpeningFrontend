// components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // You need to implement this auth context
  console.log("isAuthenticated",isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/authentication/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;