import React from "react";
import styled from "styled-components";

import Card from "react-bootstrap/Card";

const FeedMainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f9fc;
`;

const PostBody = styled(Card)`
  width: 100%;
  max-width: 500px;
  margin: 0 20px; /* Ensures some padding on smaller screens */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-height: 10em;
`;

const EmployeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #f0f3f7;

  min-height: 7em;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #dfe2e6;
  min-height: 15em;
`;

const FeedMain = () => {
  return (
    <FeedMainContainer>
      <PostBody>
        <EmployeeContainer></EmployeeContainer>
        <ImageContainer></ImageContainer>
      </PostBody>
    </FeedMainContainer>
  );
};

export default FeedMain;
