import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userData, setUserData] = useState({ name: "", email: "", token: "" });

  useEffect(() => {
    const storedData = localStorage.getItem("authData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setIsAuthenticated(true);
      setUserData(parsedData);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (data) => {
    setIsAuthenticated(true);
    setUserData(data);
    localStorage.setItem("authData", JSON.stringify(data));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData({ name: "", email: "", token: "" });
    localStorage.removeItem("authData");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
