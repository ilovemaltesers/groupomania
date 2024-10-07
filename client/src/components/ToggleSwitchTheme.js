// ToggleSwitchTheme.js
import React from "react";
import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContext";

// Styled-components for the toggle switch and its elements
const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  margin-top: 30px;
`;

const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) =>
      theme.primary}; /* Use theme's primary color */
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

// Styled-component for the toggle text, with dynamic color based on theme
const ToggleText = styled.span`
  margin-left: 10px; /* Add space between toggle and text */
  color: ${({ theme }) => theme.quinary}; /* Use theme's text color */
`;

// ThemeToggleSwitch component
const ThemeToggleSwitch = () => {
  const { toggleTheme, theme } = useTheme(); // Access theme and toggle function

  return (
    <ToggleWrapper>
      <ToggleLabel>
        <ToggleInput
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === "dark"} // Check if dark mode is active
        />
        <ToggleSlider />
      </ToggleLabel>
      <ToggleText>{theme === "light" ? "Light Mode" : "Dark Mode"}</ToggleText>
    </ToggleWrapper>
  );
};

export default ThemeToggleSwitch;
