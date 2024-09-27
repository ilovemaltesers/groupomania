// In NewPost.js or a new file if preferred
import React from "react";
import axios from "axios";
import styled from "styled-components";

const StyledDeleteCommentButton = styled.button`
  background-color: white; /* Change color for visibility */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  margin-top: 7px;

  &:hover {
    font-size: 25px;
  }
`;

const DeleteCommentButton = ({ commentId, onDelete }) => {
  const handleDelete = async () => {
    onDelete(commentId);
    return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onDelete(commentId);
      console.log("Comment deleted successfully.");
    } catch (error) {
      console.error(
        "Error deleting comment:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <StyledDeleteCommentButton onClick={handleDelete}>
      🗑️
    </StyledDeleteCommentButton>
  );
};

export default DeleteCommentButton;
