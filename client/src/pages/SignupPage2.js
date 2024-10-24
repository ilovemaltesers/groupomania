import React from "react";
import {
  Background,
  SignupBox,
  AlreadyAccountLink,
  TitleContainer,
  SignupLogo,
  GroupomaniaText,
} from "../styles/stylesSignupPage";

import SignupFormComp from "../components/SignupFormComp";

import { ReactComponent as Logo } from "../assets/images/signup-logo.svg"; // Import the SVG as a React component

const SignupPage = () => {
  return (
    <Background>
      <SignupBox>
        <TitleContainer>
          {/* Render the SVG as a React component */}
          <SignupLogo>
            <Logo />
          </SignupLogo>
          <GroupomaniaText>Groupomania</GroupomaniaText>
        </TitleContainer>
        <SignupFormComp />
        <AlreadyAccountLink to="/login">
          Already have an account?
        </AlreadyAccountLink>
      </SignupBox>
    </Background>
  );
};

export default SignupPage;
