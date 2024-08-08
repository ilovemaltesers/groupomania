import React from "react";
import ProfileCard from "../components/ProfileCard";
import {
  ProfileNavbar,
  LogoutIcon,
  NavContainer,
} from "../styles/stylesProfilePage";
import logo from "../assets/images/feed-logo.svg";
import { Container, Row, Col } from "react-bootstrap";

const ProfilePage = () => {
  return (
    <>
      <ProfileNavbar>
        <NavContainer>
          <img
            src={logo}
            height="30"
            className="d-inline-block align-top"
            alt="My Logo"
          />
          <LogoutIcon />
        </NavContainer>
      </ProfileNavbar>
      <Container>
        <Row className="">
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <ProfileCard />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
