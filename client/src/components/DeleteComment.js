import React from "react";
import styled from "styled-components";
import axios from "axios";

const StyledDeleteCommentButton = styled.button`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;

  &:hover {
    font-size: 40px;
  }
`;

const handleDeleteComment = async (commentId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Authorization token is missing.");
    return;
  }

  try {
    const response = await axios.delete(
      `http://localhost:3000/api/comment/${commentId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Comment deleted successfully:", response.data);
  } catch (error) {
    console.error(
      "Error deleting comment:",
      error.response ? error.response.data : error.message
    );
  }
};

const DeleteComment = ({ commentId, buttonText = "🗑️" }) => {
  return (
    <StyledDeleteCommentButton onClick={() => handleDeleteComment(commentId)}>
      {buttonText}
    </StyledDeleteCommentButton>
  );
};

export default DeleteComment;
