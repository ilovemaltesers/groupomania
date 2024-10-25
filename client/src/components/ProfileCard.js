import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Form, Modal } from "react-bootstrap";
import TitleLoggedUser from "./TitleLoggedUser";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ThemeToggleSwitch from "../components/ToggleSwitchTheme";
import {
  StyledModal,
  StyledButton,
  StyledFormLabel,
} from "../styles/styledModal";
import {
  RubbishIcon,
  PasswordIcon,
  EditPenIcon,
  ImageIcon,
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
  YourRoleText,
} from "../styles/stylesProfilePage";

const ProfileCard = () => {
  const { updateProfilePicture, logout } = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [roleTitle, setRoleTitle] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [submittedData, setSubmittedData] = useState({
    roleTitle: "",
    aboutMe: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");

  // Fetch profile image and data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token is not available");
          return;
        }

        const profileResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/profile/role/aboutme`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRoleTitle(profileResponse.data.roleTitle);
        setAboutMe(profileResponse.data.aboutMe);

        const imageResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/profile-picture`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setImage(
          imageResponse.data.imageUrl
            ? `http://localhost:3000/${imageResponse.data.imageUrl}`
            : ""
        );
      } catch (error) {
        console.error(
          "Error fetching profile data or image:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchProfileData();
  }, []);

  // Handle image file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Preview the uploaded image
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
        `${process.env.REACT_APP_API_URL}/user/upload-profile-picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = `${response.data.imageUrl}`;
      updateProfilePicture(imageUrl); // Update the profile picture in context
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const titleRoleAboutMe = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is not available");
      return;
    }

    const formData = { roleTitle, aboutMe };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/user/profile/role/aboutme`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSubmittedData(formData);
      setShowModal(false);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is not available");
      return;
    }

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/user/profile/delete/account`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      logout();
      navigate("/signup");
      console.log("Account deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting account:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccessMessage("");

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
        `${process.env.REACT_APP_API_URL}/user/profile/change-password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPasswordSuccessMessage("Your password has been changed successfully!");
      setShowPasswordModal(false);
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
                        margin: "20px 0",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <ImagePlaceholderIcon />
                  )}
                </ProfilePictureWrapper>

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
                  Edit Profile&nbsp;
                  <EditPenIcon />
                </ButtonSaveChanges>

                <ButtonUploadImg
                  onClick={() => document.getElementById("file-input").click()}
                >
                  Upload/Edit Image&nbsp;
                  <ImageIcon />
                </ButtonUploadImg>

                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                <ButtonSaveChanges
                  onClick={() => setShowPasswordModal(true)}
                  className="mt-3"
                >
                  Change Password&nbsp;
                  <PasswordIcon />
                </ButtonSaveChanges>

                <ButtonDeleteAccount
                  onClick={handleDeleteAccount}
                  className="mt-3"
                >
                  Delete Account&nbsp;
                  <RubbishIcon />
                </ButtonDeleteAccount>
                <ThemeToggleSwitch />
              </RightColumn>
            </Row>

            {/* Modal for editing profile */}
            <StyledModal
              show={showModal}
              onHide={() => setShowModal(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={titleRoleAboutMe}>
                  <Form.Group>
                    <StyledFormLabel>Role Title</StyledFormLabel>
                    <Form.Control
                      type="text"
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <StyledFormLabel>About Me</StyledFormLabel>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.target.value)}
                    />
                  </Form.Group>
                  <StyledButton type="submit" className="mt-3">
                    Save Changes
                  </StyledButton>
                </Form>
              </Modal.Body>
            </StyledModal>

            {/* Modal for changing password */}
            <StyledModal
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
                  <StyledButton type="submit" className="mt-3">
                    Save Password
                  </StyledButton>
                </Form>
              </Modal.Body>
            </StyledModal>
          </StyledCard>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default ProfileCard;
