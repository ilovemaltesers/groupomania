import styled from "styled-components";
import BackgroundImage from "../assets/images/fern.jpg";

const Background = styled.div`
  background-image: url(${BackgroundImage});

  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  background-color: ${(props) => props.theme.card_background};
  padding: 20px;
  border-radius: 20px;
  border-color: ${(props) => props.theme.card_background};
  box-shadow: 0 10px 10px rgba(0, 56, 28, 0.5);

  max-width: 600px;
  width: 90%;
  margin: 20px auto;
  @media (min-width: 768px) {
    width: 70%;
  }
  input.input-error,
  select.input-error {
    border: 1px solid ${(props) => props.theme.button_text_deselected};
  }
`;

const LoginButton = styled.button`
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
    outline: none;
    box-shadow: none;
    color: ${(props) => props.theme.button_text_deselected};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
  color: ${(props) => props.theme.secondary};
`;

const GroupomaniaText = styled.h1`
  color: ${({ theme }) => theme.login_primary};
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 6px;
`;

const LoginLogo = styled.svg`
  width: 50px;
  height: 60px;
  rect {
    fill: ${(props) => props.theme.logoBackground};
    position: absolute;
    z-index: 1;
  }
  path,
  g {
    fill: ${(props) => props.theme.logoOutline};
    position: relative;
    z-index: 2;
  }
`;

const Label = styled.label`
  color: ${(props) => props.theme.quinary};
`;

const StyledInput = styled.input`
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
    border-color: ${(props) => props.theme.errorColor}; /* Define error color */
  }
`;

const StyledError = styled.p`
  color: ${(props) => props.theme.inputErrorMsg};
  margin: 0;
  margin-bottom: 10px;
`;

export {
  Label,
  Background,
  LoginBox,
  LoginButton,
  TitleContainer,
  LoginLogo,
  GroupomaniaText,
  StyledInput,
  StyledError,
};
