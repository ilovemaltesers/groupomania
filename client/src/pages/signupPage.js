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

import logo from "../assets/images/signup-logo.svg";

const SignupPage = () => {
  return (
    <Background>
      <SignupBox>
        <TitleContainer>
          <SignupLogo src={logo} alt="signup logo" />
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
