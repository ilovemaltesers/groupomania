import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import TitleLoggedUser from "./TitleLoggedUser";

import {
  StyledAboutMeText,
  ImagePlaceholderIcon,
} from "../styles/stylesProfilePage";

// Styled components

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
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(175, 228, 236);
`;

const LeftColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center; /* Center text horizontally */
`;

const RightColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Evenly spaces out the buttons */
  height: 100%; /* Ensures column takes full height */
  padding: 20px 0;
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

const ButtonDeleteAccount = styled(Button)`
  background-color: #bdebff;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: darkred;
    color: white;
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const ProfilePictureWrapper = styled.div`
  margin-top: 20px;
`;

const ProfileCard = () => {
  const [image, setImage] = useState(null);
  const [roleTitle, setRoleTitle] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false); // For controlling profile edit modal
  const [showPasswordModal, setShowPasswordModal] = useState(false); // For controlling password modal
  const [submittedData, setSubmittedData] = useState({
    roleTitle: "",
    aboutMe: "",
  });

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

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token is not available");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/user/profile/role/aboutme",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Set profile data
      setRoleTitle(response.data.roleTitle);
      setAboutMe(response.data.aboutMe);
    } catch (error) {
      console.error(
        "Error fetching profile data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchProfileData();
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

  // Handle profile form submission
  const titleRoleAboutMe = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
      console.error("Token is not available");
      return;
    }

    const formData = { roleTitle, aboutMe };

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

      setSubmittedData(formData); // Store submitted data
      setShowModal(false); // Close profile modal
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is not available");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Password changed successfully:", response.data);
      setShowPasswordModal(false); // Close password modal after success
    } catch (error) {
      console.error(
        "Error changing password:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) {
      console.error("Token is not available");
      return;
    }

    try {
      const response = await axios.delete(
        "http://localhost:3000/api/user/profile/delete/account",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Account deleted successfully:", response.data);
    } catch (error) {
      console.error(
        "Error deleting account:",
        error.response ? error.response.data : error.message
      );
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
                <ProfilePictureWrapper>
                  {image ? (
                    <img
                      src={image}
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "20px 0", // Space between image and text
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <ImagePlaceholderIcon />
                  )}
                </ProfilePictureWrapper>

                {/* Centered Title and About Me */}
                <div className="mt-4">
                  <h3>{roleTitle || "Your Role Title"}</h3>
                  <StyledAboutMeText>
                    {aboutMe || "Write something about yourself..."}
                  </StyledAboutMeText>
                </div>
              </LeftColumn>
              <RightColumn md={6}>
                <ButtonSaveChanges
                  onClick={() => setShowModal(true)}
                  className="mt-3"
                >
                  Edit Profile 🪄
                </ButtonSaveChanges>

                {/* Move Upload/Edit Image Button before Change Password */}
                <ButtonUploadImg
                  onClick={() => document.getElementById("file-input").click()}
                >
                  Upload/Edit Image 📸
                </ButtonUploadImg>

                <ButtonSaveChanges
                  onClick={() => setShowPasswordModal(true)}
                  className="mt-3"
                >
                  Change Password 🔐
                </ButtonSaveChanges>

                <ButtonDeleteAccount
                  onClick={handleDeleteAccount}
                  className="mt-3"
                >
                  Delete Account 🗑️
                </ButtonDeleteAccount>
              </RightColumn>
            </Row>

            {/* Modal for editing profile */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={titleRoleAboutMe}>
                  <Form.Group>
                    <Form.Label>Role Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>About Me</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" className="mt-3">
                    Save Changes
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>

            {/* Modal for changing password */}
            <Modal
              show={showPasswordModal}
              onHide={() => setShowPasswordModal(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleChangePassword}>
                  <Form.Group>
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" className="mt-3">
                    Save Password
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>

            <ImageUploadInput
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </StyledCard>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default ProfileCard;
