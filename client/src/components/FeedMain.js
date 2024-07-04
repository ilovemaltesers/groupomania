import React, { useState } from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";

const FeedMainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f9fc;
`;

const NewPostBody = styled(Card)`
  width: 100%;
  max-width: 500px;
  margin: 0 20px; /* Ensures some padding on smaller screens */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-height: 10em;
`;

const TellMeText = styled.h4`
  font-size: 1.25em; /* Adjust the size as needed */
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 3em;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical; /* Allow vertical resizing */
`;

const NewCommentButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  justify-content: space-between;
  margin-top: 10px;
`;

const SubmitNewCommentButton = styled.button`
  background-color: #bdebff;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const UploadImageButton = styled.button`
  background-color: #bdebff;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const FeedMain = () => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <FeedMainContainer>
      <NewPostBody>
        <TellMeText>So what do you want to tell me?</TellMeText>
        <CommentTextarea
          placeholder="Write your comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        {/* Optionally, you can add a submit button or handle form submission */}
        <NewCommentButtonContainer>
          <UploadImageButton type="submit">Upload Image</UploadImageButton>
          <SubmitNewCommentButton type="submit">Submit</SubmitNewCommentButton>
        </NewCommentButtonContainer>
      </NewPostBody>
    </FeedMainContainer>
  );
};

export default FeedMain;
