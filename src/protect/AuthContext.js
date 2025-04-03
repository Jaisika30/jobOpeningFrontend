// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing token when app loads
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    setIsInitialized(true);
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/authentication/sign-in");
  };

  // Don't render children until auth state is initialized
  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);