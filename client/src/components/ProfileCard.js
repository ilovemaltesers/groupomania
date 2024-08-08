import React from "react";
import styled from "styled-components";
import { FcManager } from "react-icons/fc";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

// Styled component for the icon
const ImagePlaceholderIcon = styled(FcManager)`
  font-size: 10em;
  margin-bottom: 20px;
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
  max-width: 600px;
  height: 70%;
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(175, 228, 236);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  }
`;

const ProfileCard = () => {
  return (
    <StyledContainer fluid>
      <Row className="w-100 h-100">
        <Col className="d-flex justify-content-center align-items-center">
          <StyledCard>
            <ImagePlaceholderIcon />
            <ButtonUploadImg>Upload Image</ButtonUploadImg>
          </StyledCard>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default ProfileCard;
