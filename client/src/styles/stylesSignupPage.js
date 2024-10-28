import styled from "styled-components";
import BackgroundImage from "../assets/images/fern.jpg";
import { Link } from "react-router-dom";

export const Background = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
`;

export const SignupBox = styled.div`
  background-color: ${(props) => props.theme.card_background};
  padding: 10px;
  padding-bottom: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 8px rgba(0, 56, 28, 0.5);
  max-width: 350px;
  max-height: 70%;
  overflow-y: auto; /* Enable scroll within card if content overflows */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  @media (min-width: 768px) {
    width: 70%;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const SignupButton = styled.button`
  display: block;
  width: 100%;
  background-color: ${(props) => props.theme.login_primary};
  border: none;
  color: ${(props) => props.theme.button_text_deselected};
  padding: 8px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;

  &:hover {
    background-color: ${(props) => props.theme.login_secondary};
  }
`;

export const AlreadyAccountLink = styled(Link)`
  text-align: center;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  font-size: 0.85rem;
  margin-top: 5px;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack logo and title vertically */
  align-items: center; /* Center align logo and title */
  padding: 0; /* Remove padding */
  width: 100%;
  box-sizing: border-box;
`;

export const SignupLogo = styled.svg`
  max-width: 70px;
  height: 70px;
  margin-bottom: 0;
`;

export const GroupomaniaText = styled.h1`
  color: ${(props) => props.theme.login_primary};
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
`;

export const Label = styled.label`
  color: ${(props) => props.theme.quinary};
  font-size: 0.85rem;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid ${(props) => props.theme.quinary};
  border-radius: 5px;
  font-size: 0.85rem;

  &:focus {
    border-color: ${(props) => props.theme.inputFocus};
    border: 2px solid ${(props) => props.theme.inputFocus};
  }

  &.input-error {
    border-color: ${(props) => props.theme.errorColor};
  }
`;

export const StyledError = styled.p`
  color: ${(props) => props.theme.inputErrorMsg};
  font-size: 0.75rem;
  margin: 0;
  margin-bottom: 5px;
  line-height: 1.2;
`;

export { SignupButton };
