import React from "react";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";

const UserText = styled.h1`
  font-family: "Mooli", sans-serif;
  font-size: 1.5em;
  margin: 0;
`;

const TitleLoggedUser = () => {
  const { isAuthenticated, auth } = useAuth();

  return (
    <UserText>
      {isAuthenticated && auth?.givenName
        ? `${auth.givenName}'s profile`
        : "User profile"}
    </UserText>
  );
};

export default TitleLoggedUser;
