import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "context/AuthContext";

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Cargando...</div>; // O un spinner de carga
    }

    if (isAuthenticated && location.pathname.startsWith("/authentication")) {
        return <Navigate to="/tables" />;
    }


    return isAuthenticated ? children : <Navigate to="/authentication/sign-in" />;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;