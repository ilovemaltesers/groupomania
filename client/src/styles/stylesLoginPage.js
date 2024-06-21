import styled from "styled-components";

import BackgroundImage from "../assets/images/bg-signup.jpg";

export const Background = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginBox = styled.div`
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

  @media (min-width: 1024px) {
    width: 50%;
    margin-left: 20%;
    margin-right: 20%;
  }
`;
