import styled from "styled-components";
import { Navbar, Container, Card, Col, Button } from "react-bootstrap";
import { IoLogOutOutline } from "react-icons/io5";
import { MdFace2 } from "react-icons/md";

const SaveChangedPasswordButton = styled(Button)`
  background-color: #bdebff;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: bisque;
    color: black;
  }
`;

const ProfileNavbar = styled(Navbar)`
  background-color: #bdebff;
`;

const NavContainer = styled(Container)`
  display: flex;
  flex-wrap: inherit;
  align-items: center;
  justify-content: space-between;
  background-color: #bdebff;
`;

const LogoutIcon = styled(IoLogOutOutline)`
  font-size: 32px;
  color: black;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledAboutMeText = styled.p`
  font-size: 1.25em; /* You can adjust this value as needed */
  line-height: 1.6;
  text-align: center;
  margin-top: 10px;
  color: #333; /* Adjust text color if needed */
`;

const ImagePlaceholderIcon = styled(MdFace2)`
  font-size: 10em;

  width: 100px;
  height: 100px;
`;

const StyledContainer = styled(Container)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: hidden;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 800px;
  height: auto;
  padding: 40px;
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(175, 228, 236);
`;

const LeftColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center; /* Center text horizontally */
`;

const RightColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Evenly spaces out the buttons */
  height: 100%; /* Ensures column takes full height */
  padding: 20px 0;
`;

const ButtonUploadImg = styled(Button)`
  background-color: #bdebff;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: bisque;
    color: black;
  }
`;

const ButtonSaveChanges = styled(Button)`
  background-color: #bdebff;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: bisque;
    color: black;
  }
`;

const ButtonDeleteAccount = styled(Button)`
  background-color: #bdebff;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: darkred;
    color: white;
  }
`;

const ProfilePictureWrapper = styled.div`
  margin-top: 20px;
`;

const ImageUploadInput = styled.input`
  display: none;
`;

export {
  ProfileNavbar,
  LogoutIcon,
  NavContainer,
  StyledAboutMeText,
  ImagePlaceholderIcon,
  StyledContainer,
  StyledCard,
  LeftColumn,
  RightColumn,
  ButtonUploadImg,
  ButtonSaveChanges,
  ButtonDeleteAccount,
  ProfilePictureWrapper,
  ImageUploadInput,
  SaveChangedPasswordButton,
};
