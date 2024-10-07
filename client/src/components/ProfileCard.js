import React, { useState, useEffect } from "react";
import axios from "axios";

import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import TitleLoggedUser from "./TitleLoggedUser";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ThemeToggleSwitch from "../components/ToggleSwitchTheme";
import {
  StyledAboutMeText,
  ImagePlaceholderIcon,
  StyledContainer,
  StyledCard,
  LeftColumn,
  RightColumn,
  ButtonUploadImg,
  ButtonSaveChanges,
  ButtonDeleteAccount,
  ProfilePictureWrapper,
  ImageUploadInput,
  SaveChangedPasswordButton,
  YourRoleText,
} from "../styles/stylesProfilePage";

const ProfileCard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
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
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");

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

      const imageUrl = `http://localhost:3000/${response.data.imageUrl}`;

      setImage(imageUrl);
      console.log(image);
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

      logout();
      navigate("/signup");

      console.log("Account deleted successfully:", response.data);
    } catch (error) {
      console.error(
        "Error deleting account:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError(""); // Reset error state
    setPasswordSuccessMessage(""); // Reset success message

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setPasswordError("User token is not available.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/user/profile/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPasswordSuccessMessage("Your password has been changed successfully!");
      setShowPasswordModal(false); // Close password modal after success
    } catch (error) {
      setPasswordError(
        error.response ? error.response.data : "Error changing password."
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
                  <YourRoleText>{roleTitle || "Your Role Title"}</YourRoleText>

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
                  Edit Profile&nbsp; 🪄
                </ButtonSaveChanges>

                {/* Move Upload/Edit Image Button before Change Password */}
                <ButtonUploadImg
                  onClick={() => document.getElementById("file-input").click()}
                >
                  Upload/Edit Image&nbsp;📸
                </ButtonUploadImg>

                <ButtonSaveChanges
                  onClick={() => setShowPasswordModal(true)}
                  className="mt-3"
                >
                  Change Password&nbsp;🔐
                </ButtonSaveChanges>

                <ButtonDeleteAccount
                  onClick={handleDeleteAccount}
                  className="mt-3"
                >
                  Delete Account&nbsp;🗑️
                </ButtonDeleteAccount>
                <ThemeToggleSwitch />
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
                {passwordError && (
                  <div style={{ color: "red" }}>{passwordError}</div>
                )}
                {passwordSuccessMessage && (
                  <div style={{ color: "green" }}>{passwordSuccessMessage}</div>
                )}
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
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  <SaveChangedPasswordButton type="submit" className="mt-3">
                    Save Password
                  </SaveChangedPasswordButton>
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
