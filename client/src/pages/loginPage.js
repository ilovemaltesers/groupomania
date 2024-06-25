import {
  Background,
  LoginBox,
  LoginLogo,
  GroupomaniaText,
  TitleContainer,
} from "../styles/stylesLoginPage";

import Logo from "../assets/images/signup-logo.svg";
import LoginformComp from "../components/LoginFormComp";

const LoginPage = () => {
  return (
    <Background>
      <LoginBox>
        <TitleContainer>
          <LoginLogo src={Logo} alt="Groupomania Logo" />
          <GroupomaniaText>Groupomania</GroupomaniaText>
        </TitleContainer>
        <LoginformComp></LoginformComp>
      </LoginBox>
    </Background>
  );
};

export default LoginPage;
