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
  align-items: flex-start;
  overflow-y: auto;
  padding: 20px;
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

  /* Add styles for input and select elements with the input-error class */
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

  appearance: none;
  -webkit-appearance: none;
  border: none;

  -webkit-tap-highlight-color: transparent;

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
    outline: none;
    box-shadow: none;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const SignupLogo = styled.svg`
  max-width: 100px;
  height: auto;
  margin-bottom: 10px;
  position: relative;

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
  max-width: 90%;
  margin: 0 auto;

  /* Responsive adjustments */
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const Label = styled.label`
  color: ${(props) => props.theme.quinary};
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.theme.quinary};
  border-radius: 5px;

  &:focus {
    border-color: ${(props) => props.theme.inputFocus};
    border: 3px solid ${(props) => props.theme.inputFocus};
  }

  /* Error state styling */
  &.input-error {
    border-color: ${(props) => props.theme.errorColor};
  }
`;

export const StyledError = styled.p`
  color: ${(props) => props.theme.inputErrorMsg};
  margin: 0;
  margin-bottom: 10px;
`;

export { SignupButton };
