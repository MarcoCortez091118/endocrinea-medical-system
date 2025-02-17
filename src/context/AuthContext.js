import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    token: "",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const location = useLocation();
  const navigate = useNavigate();
  let logoutTimeout = null; // Cierre automático de sesión
  let warningTimeout = null; // Advertencia 5 minutos antes

  useEffect(() => {
    const checkAuthStatus = () => {
      const storedData = localStorage.getItem("authData");
      const lastPath = localStorage.getItem("lastPath") || "/tables";

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          const { token } = parsedData;

          if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Convertimos milisegundos a segundos

            if (decodedToken.exp && decodedToken.exp < currentTime) {
              showSnackbar("Token expirado. Cerrando sesión...", "error");
              logout();
              return;
            }

            setIsAuthenticated(true);
            setUserData(parsedData);
            navigate(lastPath);

            // Programar la advertencia y el cierre de sesión
            scheduleAutoLogout(decodedToken.exp);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error al procesar authData:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("lastPath", location.pathname);
    }
  }, [location, isAuthenticated]);

  /**
   * Programa el cierre de sesión automático y el aviso 5 minutos antes.
   */
  const scheduleAutoLogout = (expTime) => {
    if (logoutTimeout) {
      clearTimeout(logoutTimeout); // Limpiar cualquier timeout anterior
    }
    if (warningTimeout) {
      clearTimeout(warningTimeout);
    }

    const currentTime = Date.now() / 1000;
    const timeUntilExpiration = expTime - currentTime;
    const warningTime = timeUntilExpiration - 300; // 5 minutos antes de expirar

    if (warningTime > 0) {
      warningTimeout = setTimeout(() => {
        showSnackbar("Tu sesión expirará en pocos minutos. Guarda tu trabajo.", "warning", 300000);
      }, warningTime * 1000);
    }

    if (timeUntilExpiration > 0) {
      console.log(`Cerrando sesión en ${Math.floor(timeUntilExpiration)} segundos`);
      logoutTimeout = setTimeout(() => {
        showSnackbar("Tu sesión ha expirado. Inicia sesión nuevamente.", "error");
        logout();
      }, timeUntilExpiration * 1000);
    }
  };

  const login = (data) => {
    setIsAuthenticated(true);
    setUserData(data);
    localStorage.setItem("authData", JSON.stringify(data));
    navigate(localStorage.getItem("lastPath") || "/tables");

    // Programar la expiración automática del token
    const decodedToken = jwtDecode(data.token);
    scheduleAutoLogout(decodedToken.exp);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData({ firstName: "", lastName: "", email: "", role: "", token: "" });
    localStorage.removeItem("authData");
    localStorage.removeItem("lastPath");
    navigate("/authentication/sign-in");

    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }
    if (warningTimeout) {
      clearTimeout(warningTimeout);
    }
  };

  /**
   * Muestra un mensaje en el Snackbar
   * @param {string} message - El mensaje a mostrar
   * @param {"info" | "success" | "warning" | "error"} severity - Tipo de mensaje
   * @param {number} duration - Duración en ms (default 5000ms)
   */
  const showSnackbar = (message, severity, duration = 5000) => {
    setSnackbar({ open: true, message, severity });
    setTimeout(() => setSnackbar({ ...snackbar, open: false }), duration);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userData }}>
      {children}

      {/* Snackbar para mostrar notificaciones */}
      <Snackbar open={snackbar.open} autoHideDuration={null} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
