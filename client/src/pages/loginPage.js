import styled from "styled-components";
import BackgroundImage from "../assets/images/bg-signup.jpg";

import Logo from "../assets/images/signup-logo.svg";

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

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const GroupomaniaText = styled.h1`
  color: #fa8a00;
  font-size: 2.5rem;
  font-weight: bold;
  margin-left: 10px;
`;

export const LoginLogo = styled.img`
  width: 50px;
  height: 60px;
`;

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
