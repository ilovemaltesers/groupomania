import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { MdFace2 } from "react-icons/md";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import TitleLoggedUser from "./TitleLoggedUser";

// Styled components
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
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(175, 228, 236);
`;

const LeftColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RightColumn = styled(Col)`
  display: flex;
  flex-direction: column;
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

const ButtonSaveChanges = styled(Button)`
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
  const [roleTitle, setRoleTitle] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch profile image on component mount
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token is not available");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/user/profile-picture",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set image URL for display
        setImage(`http://localhost:3000/${response.data.imageUrl}`);
      } catch (error) {
        console.error(
          "Error fetching image:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchImage();
  }, []);

  // Handle image file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      saveImage(file); // Call save image function
    }
  };

  // Save uploaded image to server
  const saveImage = async (file) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is not available");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "http://localhost:3000/api/user/upload-profile-picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImage(`http://localhost:3000/${response.data.imageUrl}`);
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Handle form submission (e.g., saving role/title and about me)
  const titleRoleAboutMe = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is not available");
      return;
    }

    // Handle form data submission here (e.g., send role/title, about me to API)
    console.log("Role Title:", roleTitle);
    console.log("About Me:", aboutMe);

    const formData = {
      roleTitle: roleTitle,
      aboutMe: aboutMe,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/profile/role/aboutme",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Role and about me updated successfully:", response.data);
    } catch (error) {
      console.error(
        "Error updating role and about me:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Handle password change
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      // Send the new password to the server
      console.log("Changing password to:", newPassword);
    } else {
      console.error("Passwords do not match");
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
                    alt="Profile"
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

                <Form.Group controlId="formRoleTitle" className="mt-4">
                  <Form.Label>Edit Role/Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your role or title"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                  />
                </Form.Group>
              </LeftColumn>
              <RightColumn md={6}>
                <Form onSubmit={titleRoleAboutMe}>
                  <Form.Group controlId="formAboutMe">
                    <Form.Label>Edit About Me</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Write something about yourself"
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.target.value)}
                    />
                  </Form.Group>

                  <ButtonSaveChanges type="submit" className="mt-3">
                    Save Changes
                  </ButtonSaveChanges>
                </Form>

                <hr className="my-4" />

                <Form onSubmit={handleChangePassword}>
                  <Form.Group controlId="formCurrentPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formNewPassword" className="mt-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formConfirmPassword" className="mt-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>

                  <ButtonSaveChanges type="submit" className="mt-3">
                    Change Password
                  </ButtonSaveChanges>
                </Form>
              </RightColumn>
            </Row>
          </StyledCard>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default ProfileCard;
