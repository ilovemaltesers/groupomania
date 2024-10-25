import styled from "styled-components";
import BackgroundImage from "../assets/images/fern.jpg";
import { Link } from "react-router-dom";

export const Background = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignupBox = styled.div`
  background-color: ${(props) => props.theme.card_background};
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 10px 10px rgba(0, 56, 28, 0.5);
  max-width: 600px;
  width: 90%;
  margin: 20px auto;
  @media (min-width: 768px) {
    width: 70%;
  }

  @media (min-width: 1024px) {
    width: 50%;
    margin-left: 20%;
    margin-right: 20%;
  }

  // Add styles for input and select elements with the input-error class
  input.input-error,
  select.input-error {
  }
`;

const SignupButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 30px;
  background-color: ${(props) => props.theme.login_primary};
  border-color: ${(props) => props.theme.login_primary};
  color: ${(props) => props.theme.button_text_deselected};
  padding: 12px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;

  /* Disable default browser appearance */
  appearance: none;
  -webkit-appearance: none;
  border: none;

  /* Disable WebKit tap highlight color */
  -webkit-tap-highlight-color: transparent;

  /* Prevent text selection */
  user-select: none;

  &:hover {
    background-color: ${(props) => props.theme.login_secondary};
  }

  &:active {
    background-color: ${(props) => props.theme.login_secondary} !important;
    border-color: ${(props) => props.theme.login_secondary} !important;
    color: ${(props) => props.theme.button_text_deselected} !important;
  }

  &:focus {
    outline: none; /* Remove default focus outline */
    box-shadow: none; /* Remove focus shadow */
    color: ${(props) => props.theme.button_text_deselected};
  }
`;

export const AlreadyAccountLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
  color: ${(props) => props.theme.text};

  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.text};
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column; /* Ensure items stack vertically on smaller screens */
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 0 20px; /* Add padding for smaller screens */
  }
`;

export const SignupLogo = styled.svg`
  max-width: 100px;
  height: auto;
  margin-bottom: 10px;
  position: relative; /* Position the entire SVG for z-index control */

  /* Background Rectangle */
  rect {
    fill: ${(props) => props.theme.logoBackground};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  /* Outline Path and Group */
  path,
  g {
    fill: ${(props) => props.theme.logoOutline};
    position: relative;
    z-index: 2;
  }
`;

export const GroupomaniaText = styled.h1`
  color: ${(props) => props.theme.login_primary} !important;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
`;

export const Label = styled.label`
  color: ${(props) => props.theme.quinary};
`;

export { SignupButton };
