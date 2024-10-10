import React from "react";
import {
  Background,
  LoginBox,
  LoginLogo,
  GroupomaniaText,
  TitleContainer,
} from "../styles/stylesLoginPage";

import { ReactComponent as Logo } from "../assets/images/signup-logo.svg"; // Import the SVG as a React component
import LoginFormComp from "../components/LoginFormComp";

const LoginPage = () => {
  return (
    <Background>
      <LoginBox>
        <TitleContainer>
          {/* Render the Logo component wrapped in LoginLogo styled component */}
          <LoginLogo>
            <Logo />
          </LoginLogo>
          <GroupomaniaText>Groupomania</GroupomaniaText>
        </TitleContainer>
        <LoginFormComp />
      </LoginBox>
    </Background>
  );
};

export default LoginPage;
