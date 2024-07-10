import React from "react";

import styled from "styled-components";
import logo from "../assets/images/feed-logo.svg";
import profilePic from "../assets/images/edina2.webp";
import { Navbar, Nav, Form, FormControl, Container } from "react-bootstrap";
import { IoIosLogOut } from "react-icons/io";
import { SlMagnifier } from "react-icons/sl";
import { useAuth } from "../contexts/AuthContext";
import Popup from "./PopUp";

const CustomNavbar = styled(Navbar)`
  background-color: #bdebff;
`;

const SearchContainer = styled(Form)`
  flex-grow: 1;
  display: flex;
  align-items: center;
  margin-left: 20px;
  max-width: 80%; /* Adjusted for responsiveness */
  border-radius: 10px;
  position: relative; /* Ensure the search icon stays aligned */
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
  padding-right: 40px; /* Space for the icon */
`;

const SearchIcon = styled(SlMagnifier)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const LogoutIcon = styled(IoIosLogOut)`
  font-size: 32px;
  cursor: pointer;
`;

const FeedNavbar = () => {
  // logout function from useAuth hook
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <CustomNavbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            height="30"
            className="d-inline-block align-top"
            alt="My Logo"
          />
          <Popup />
        </Navbar.Brand>
        <SearchContainer>
          <StyledFormControl
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <SearchIcon />
        </SearchContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="ml-auto align-items-center">
            <ProfileImage src={profilePic} alt="Profile" />
            <LogoutIcon style={{ marginLeft: "10px" }} onClick={handleLogout} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </CustomNavbar>
  );
};

export { FeedNavbar };
