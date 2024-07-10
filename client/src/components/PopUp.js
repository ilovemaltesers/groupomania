import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAuth } from "../contexts/AuthContext";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 20px; /* Adjust as needed */
  left: 50%;
  transform: translateX(-50%);
  background-color: #f2f9fc;
  border-radius: 10px;
  padding: 10px; /* Adjusted padding for smaller height */
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  animation: ${fadeIn} 0.3s ease-out forwards;

  /* Initial opacity and transform */
  opacity: 0;
  transform: translateY(-10px);
`;

const Popup = () => {
  const { isAuthenticated, auth } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated && auth?.givenName) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000); // Fade out after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, auth]);

  if (isAuthenticated && auth?.givenName && visible) {
    return (
      <PopupContainer>
        <p style={{ margin: 0 }}>Hello {auth.givenName}! 🩷 ✨</p>
      </PopupContainer>
    );
  }

  return null;
};

export default Popup;
