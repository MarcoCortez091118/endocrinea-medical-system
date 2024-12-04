import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

function ProtectedRoute({ children, }) {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : <Navigate to="/authentication/sign-in" />;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
