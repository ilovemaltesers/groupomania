import styled from "styled-components";
import { Navbar, Container } from "react-bootstrap";
import { IoLogOutOutline } from "react-icons/io5";

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

export { ProfileNavbar, LogoutIcon, NavContainer };
