import React from "react";
import styled from "styled-components";
import { FcManager } from "react-icons/fc";

const CardContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  margin-top: 10em;
`;

const ImagePlaceholderIcon = styled(FcManager)`
  font-size: 5em;
  margin-bottom: 20px;
`;

const ProfileCard = () => {
  return (
    <CardContainer>
      <ImagePlaceholderIcon />
      <h5>Name Goes Here</h5>
      <p>Groupomania Staff Member</p>
    </CardContainer>
  );
};

export default ProfileCard;
