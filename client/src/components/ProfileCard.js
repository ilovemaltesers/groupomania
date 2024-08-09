import React, { useState } from "react";
import styled from "styled-components";
import { MdFace2 } from "react-icons/md";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import TitleLoggedUser from "../components/TitleLoggedUser";

// Styled component for the icon
const ImagePlaceholderIcon = styled(MdFace2)`
  font-size: 10em;
  margin: 20px 0;
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
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(175, 228, 236);
`;

const LeftColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center; // Center horizontally
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

const ImageUploadInput = styled.input`
  display: none;
`;

const ProfileCard = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <StyledContainer fluid>
      <Row className="w-100 h-100">
        <Col className="d-flex justify-content-center align-items-center">
          <StyledCard>
            <Row>
              <LeftColumn md={6}>
                <TitleLoggedUser />
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded"
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "20px 0",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <ImagePlaceholderIcon />
                )}
                <ButtonUploadImg
                  onClick={() => document.getElementById("file-input").click()}
                >
                  Upload Image
                </ButtonUploadImg>
                <ImageUploadInput
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </LeftColumn>
              <Col md={6}>
                <Form>
                  <Form.Group controlId="formRoleTitle">
                    <Form.Label>Edit Role/Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your role or title"
                    />
                  </Form.Group>

                  <Form.Group controlId="formAboutMe" className="mt-3">
                    <Form.Label>Edit About Me</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Write something about yourself"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-3">
                    Save Changes
                  </Button>
                </Form>
              </Col>
            </Row>
          </StyledCard>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default ProfileCard;
