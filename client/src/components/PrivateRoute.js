import React from "react";
import { Navigate } from "react-router-dom";

// Import useAuth hook from the authentication context to access authentication state.
import { useAuth } from "../contexts/AuthContext";

// Define the PrivateRoute component that wraps around the child comps that need authentication.
const PrivateRoute = ({ children }) => {
  // Destructure the isAuthenticated value from the authentication context.
  const { isAuthenticated } = useAuth();

  // If the user is authenticated, render the children components.
  // Otherwise, redirect to the login page using the Navigate component.
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Export the PrivateRoute component for use in other parts of the application.
export default PrivateRoute;
