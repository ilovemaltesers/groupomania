import styled from "styled-components";

import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

// To move styling to seperate it's file afterwards

const FeedPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: lightcyan;
  height: 100vh;
`;

const FeedPage = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) <Navigate to="/login" replace />;

  return (
    <>
      <FeedPageContainer className="container-fluid"></FeedPageContainer>
    </>
  );
};

export default FeedPage;
