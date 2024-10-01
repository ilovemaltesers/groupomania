import styled from "styled-components";
import { Navbar, Container } from "react-bootstrap";
import { IoLogOutOutline } from "react-icons/io5";
import { MdFace2 } from "react-icons/md";
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
  margin: 20px 0;
  width: 100px;
  height: 100px;
`;

export {
  ProfileNavbar,
  LogoutIcon,
  NavContainer,
  StyledAboutMeText,
  ImagePlaceholderIcon,
};
