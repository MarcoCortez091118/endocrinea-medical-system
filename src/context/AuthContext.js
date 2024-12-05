import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "", token: "" });

  const login = (data) => {
    setIsAuthenticated(true);
    setUserData(data);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData({ name: "", email: "", token: "" });
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
