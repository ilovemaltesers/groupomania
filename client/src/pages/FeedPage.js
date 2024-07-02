import React from "react";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import logo from "../assets/images/feed-logo.svg";
import profilePic from "../assets/images/edina2.webp";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import { IoIosLogOut } from "react-icons/io";
import { SlMagnifier } from "react-icons/sl";

const CustomNavbar = styled(Navbar)`
  background-color: #dceaf5; /* Set the background color to #9effb8 */
`;

const SearchContainer = styled(Form)`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  margin-left: 20px;
  max-width: 300px;
  border-radius: 10px;
`;

const StyledFormControl = styled(FormControl)`
  flex-grow: 1;
  width: auto;
`;

const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 20px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 24px;
`;

const LogoutIcon = styled(IoIosLogOut)`
  font-size: 32px;
`;

const MyNavbar = () => {
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
        </Navbar.Brand>
        <SearchContainer>
          <StyledFormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
        </SearchContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <IconWrapper>
              <SlMagnifier />
            </IconWrapper>
            <IconWrapper>
              <LogoutIcon />
            </IconWrapper>
            <ProfileImage src={profilePic} alt="Profile" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </CustomNavbar>
  );
};

export default MyNavbar;
