import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import {
  ProfileNavbar,
  LogoutIcon,
  NavContainer,
} from "../styles/stylesProfilePage";
import logo from "../assets/images/feed-logo.svg";
import { Container, Row, Col } from "react-bootstrap";

const ProfilePage = () => {
  const leavePage = useNavigate();

  const handleLeavePage = () => {
    leavePage("/feed");
  };

  return (
    <>
      <ProfileNavbar>
        <NavContainer>
          <img
            src={logo}
            height="30"
            className="d-inline-block align-top"
            alt="placeholder"
          />

          <LogoutIcon onClick={handleLeavePage} />
        </NavContainer>
      </ProfileNavbar>

      <Container fluid>
        <Row className="">
          <Col
            md={12}
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
