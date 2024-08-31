import React, { useState, useEffect } from "react";
import styled from "styled-components";

const EditPostPopUp = ({ post, onClose, onSave }) => {
  const [content, setContent] = useState(post.content || "");
  const [image, setImage] = useState(post.media_upload || null);

  useEffect(() => {
    setContent(post.content || "");
    setImage(post.media_upload || null);
  }, [post]);

  const handleEditPostContent = (e) => {
    setContent(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Save the raw file instead of Base64
    }
  };

  const handleSave = () => {
    onSave({
      ...post,
      content,
      image, // Pass the updated image
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <StyledEditPostContainer>
      <EditPostTextarea
        value={content}
        onChange={handleEditPostContent}
        placeholder="Edit your post..."
      />
      <ImageUploadContainer>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <ImagePreview src={image} alt="Preview" />}
      </ImageUploadContainer>
      <SubmitEditButton onClick={handleSave}>Submit Edit</SubmitEditButton>
      <CancelEditButton onClick={handleCancel}>Cancel</CancelEditButton>
    </StyledEditPostContainer>
  );
};
// Styled components
const StyledEditPostContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
  width: 500px;
  max-width: 90%;
  max-height: 90%;
  box-shadow: 0 4px 12px rgba(175, 228, 236);
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

const CancelEditButton = styled.button`
  background-color: #bdebff;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: 30px;
  &:hover {
    background-color: bisque;
    color: black;
  }
`;

export default EditPostPopUp;
