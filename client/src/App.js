// Represents the main component of a React application
// that uses React Router for navigation
// and context providers for managing authentication and theming.

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalStyle } from "./styles/globalStyle";
import { ThemeContextProvider } from "./contexts/ThemeContext";
// Importing the PrivateRoute component, which protects routes that require authentication.
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <ThemeContextProvider>
        <GlobalStyle />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate replace to="/signup" />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/feed"
              element={
                <PrivateRoute redirectTo="/login">
                  <FeedPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute redirectTo="/login">
                  <ProfilePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </ThemeContextProvider>
    </>
  );
}

export { App };
