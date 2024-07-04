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

const NewPostTextarea = styled.textarea`
  width: 100%;
  min-height: 3em;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical; /* Allow vertical resizing */
`;

const NewPostButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  justify-content: space-between;
  margin-top: 10px;
`;

const SubmitNewPostButton = styled.button`
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
        <TellMeText>So what do you wish to publish today?</TellMeText>
        <NewPostTextarea
          placeholder="Write your comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <NewPostButtonContainer>
          <UploadImageButton type="submit">Upload Image</UploadImageButton>
          <SubmitNewPostButton type="submit">Submit</SubmitNewPostButton>
        </NewPostButtonContainer>
      </NewPostBody>
    </FeedMainContainer>
  );
};

export default FeedMain;
