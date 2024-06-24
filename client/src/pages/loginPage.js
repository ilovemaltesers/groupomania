import {
  Background,
  LoginBox,
  LoginLogo,
  GroupomaniaText,
  TitleContainer,
  LoginButton,
} from "../styles/stylesLoginPage";

import Logo from "../assets/images/signup-logo.svg";

const LoginPage = () => {
  return (
    <Background>
      <LoginBox>
        <TitleContainer>
          <LoginLogo src={Logo} alt="Groupomania Logo" />
          <GroupomaniaText>Groupomania</GroupomaniaText>
        </TitleContainer>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
            />
          </div>
          <LoginButton type="submit" className="btn btn-primary">
            Login
          </LoginButton>
        </form>
      </LoginBox>
    </Background>
  );
};

export default LoginPage;
