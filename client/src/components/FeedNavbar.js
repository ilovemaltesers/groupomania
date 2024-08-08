import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/feed-logo.svg";
import { Navbar, Nav, Container } from "react-bootstrap";
import { IoIosLogOut } from "react-icons/io";

import { BsFillPersonVcardFill } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";
import Popup from "./PopUp";

const CustomNavbar = styled(Navbar)`
  background-color: #bdebff;
`;

const ProfileIcon = styled(BsFillPersonVcardFill)`
  font-size: 32px;
  color: black;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &[title]:hover::after {
    content: attr(title);
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    z-index: 1000;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
`;

const LogoutIcon = styled(IoIosLogOut)`
  font-size: 32px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &[title]:hover::after {
    content: attr(title);
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    z-index: 1000;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
`;

const FeedNavbar = () => {
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
        <Nav className="ml-auto align-items-center">
          <Link to="/profile">
            {" "}
            {/* Replace "/profile" with your actual profile page route */}
            <ProfileIcon />
          </Link>
          <LogoutIcon style={{ marginLeft: "10px" }} onClick={handleLogout} />
        </Nav>
      </Container>
    </CustomNavbar>
  );
};

export { FeedNavbar };
