import styled from "styled-components";
import BackgroundImage from "../assets/images/bg-signup.jpg";
import { Link } from "react-router-dom";

export const Background = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignupBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  margin-left: 70px; /* Initial margin on larger screens */
  margin-top: 20px; /* Adjust as needed for spacing */

  @media (max-width: 1024px) {
    margin: 20px auto; /* Center horizontally when below tablet size */
  }

  @media (max-width: 768px) {
    margin: 0 auto; /* Full centering on smaller screens */
  }
`;

export const SignupButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 20px;
  background-color: #fa8a00;
  border: none;
`;

export const AlreadyAccountLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #fa8a00;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const SignupLogo = styled.img`
  max-width: 100px;
  height: auto;
  margin-bottom: 10px;
`;

export const GroupomaniaText = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #fa8a00;
`;
