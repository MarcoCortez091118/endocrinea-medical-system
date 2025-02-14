import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "", token: "" });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("authData");
    const lastPath = localStorage.getItem("lastPath") || "/tables";

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData?.token && parsedData?.role) {
          setIsAuthenticated(true);
          setUserData(parsedData);
          navigate(lastPath);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error parsing authData:", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("lastPath", location.pathname); // Guardar la última página
    }
  }, [location, isAuthenticated]);

  const login = (data) => {
    setIsAuthenticated(true);
    setUserData(data);
    localStorage.setItem("authData", JSON.stringify(data));
    navigate(localStorage.getItem("lastPath") || "/tables");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData({ firstName: "", lastName: "", email: "", token: "" });
    localStorage.removeItem("authData");
    localStorage.removeItem("lastPath");
    navigate("/authentication/sign-in");
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
