import React from "react";
import styled from "styled-components";
import { Navbar, Container } from "react-bootstrap";
import logo from "../assets/images/feed-logo.svg";

const ProfileNavbar = styled(Navbar)`
  background-color: #bdebff;
`;

const ProfilePage = () => {
  return (
    <>
      <ProfileNavbar expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              height="30"
              className="d-inline-block align-top"
              alt="My Logo"
            />
          </Navbar.Brand>
        </Container>
      </ProfileNavbar>
    </>
  );
};
export default ProfilePage;
