import styled from "styled-components";

const FeedPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: lightcyan;
  height: 100vh;
`;

const FeedPage = () => {
  return (
    <>
      <FeedPageContainer className="container-fluid"></FeedPageContainer>
    </>
  );
};

export default FeedPage;
