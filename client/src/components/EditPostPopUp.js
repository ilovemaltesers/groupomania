import React, { useState } from "react";
import styled from "styled-components";

// Ensure initialPost has a default value if not provided
const EditPostPopUp = ({ initialPost = { content: "" } }) => {
  const [post, setPost] = useState(initialPost); // Manage post content
  const [image, setImage] = useState(null); // Manage image upload
  const [showPopup, setShowPopup] = useState(true); // Manage popup visibility

  // Update post content
  const handleEditPostContent = (e) => {
    setPost({ ...post, content: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Close the popup
  const handleCancelButton = () => {
    setShowPopup(false);
  };

  // Handle post editing
  const handleEditPost = () => {
    // Logic to handle post editing (e.g., saving changes)
    console.log("Post edited:", post);
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && ( // Only show the popup if showPopup is true
        <StyledEditPostContainer>
          <EditPostTextarea
            value={post?.content || ""} // Safeguard with optional chaining
            onChange={handleEditPostContent}
            placeholder="Edit your post..."
          />
          <ImageUploadContainer>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {image && <ImagePreview src={image} alt="Preview" />}
          </ImageUploadContainer>
          <SubmitEditButton onClick={handleEditPost}>
            Submit Edit
          </SubmitEditButton>
          <CancelButton onClick={handleCancelButton}>Cancel</CancelButton>
        </StyledEditPostContainer>
      )}
      {!showPopup && (
        <button onClick={() => setShowPopup(true)}>Edit Post</button>
      )}{" "}
      {/* Button to show the popup */}
    </>
  );
};

// Centered Popup Styles
const StyledEditPostContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: bisque;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
  width: 500px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
`;

const EditPostTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid lightgray;
`;

const ImageUploadContainer = styled.div`
  margin-bottom: 10px;
`;

const ImagePreview = styled.img`
  margin-top: 17px;
  max-width: 100%;
  height: auto;
  border: 1px solid lightgray;
  border-radius: 4px;
  background-color: white;
`;

const SubmitEditButton = styled.button`
  background-color: #bdebff;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: bisque;
    color: black;
  }
`;

const CancelButton = styled.button`
  background-color: #ffcccb;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #ff7f7e;
    color: black;
  }
`;

export default EditPostPopUp;
