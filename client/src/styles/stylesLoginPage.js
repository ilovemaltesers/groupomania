import styled from "styled-components";
import BackgroundImage from "../assets/images/bg-signup.jpg";

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
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 10px 10px rgba(0, 56, 28, 0.5);
  max-width: 600px;
  width: 90%;
  margin: 20px auto;
  @media (min-width: 768px) {
    width: 70%;
  }
  input.input-error,
  select.input-error {
    border: 3px solid darkcyan;
  }
`;

const LoginButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 30px;
  background-color: #fa8a00;
  border: none;
  color: white;
  padding: 12px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #e37700;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const GroupomaniaText = styled.h1`
  color: #fa8a00;
  font-size: 2.5rem;
  font-weight: bold;
  margin-left: 10px;
`;

const LoginLogo = styled.img`
  width: 50px;
  height: 60px;
`;

export {
  Background,
  LoginBox,
  LoginButton,
  TitleContainer,
  LoginLogo,
  GroupomaniaText,
};
