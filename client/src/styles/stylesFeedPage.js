// styles for FeedPage

import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { FaTelegramPlane } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

const FeedMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f9fc;
  padding: 20px;
`;

const NewPostBody = styled(Card)`
  width: 100%;
  max-width: 500px;
  margin: 20px 0;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(175, 228, 236);
  border-radius: 3%;
`;

const TellMeText = styled.h4`
  font-size: 1.25em;
`;

const NewPostTextarea = styled.textarea`
  width: 100%;
  min-height: 3em;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const NewPostButtonContainer = styled.div`
  display: flex;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: bisque;
  }
`;

const UploadImageButton = styled.button`
  background-color: #bdebff;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: bisque;
  }
`;

const PlaneIcon = styled(FaTelegramPlane)`
  margin-left: 7px;
  font-size: 1.25em;
`;

const PostCard = styled(Card)`
  width: 100%;
  max-width: 500px;
  margin: 10px 0;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(175, 228, 236);
  border-radius: 3%;
`;

const StyledImage = styled.img`
  border-radius: 3%;
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border-radius: 50%;
`;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 2em;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-top: 10px;
`;

const PublishCommentButton = styled.button`
  background-color: #bdebff;
  color: black;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: bisque;
  }
`;

const RemoveEditButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const RemovePostButton = styled.button`
  background-color: bisque;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: #e74c3c;
  }
`;

const RemovePostIcon = styled(RiDeleteBin6Fill)`
  font-size: 1.25em;
  margin-left: 10px;
  margin-bottom: 5px;
`;

const EditPostButton = styled.button`
  background-color: #bdebff;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: bisque;
  }
`;

export {
  FeedMainContainer,
  NewPostBody,
  TellMeText,
  NewPostTextarea,
  NewPostButtonContainer,
  SubmitNewPostButton,
  UploadImageButton,
  PlaneIcon,
  PostCard,
  StyledImage,
  CommentSection,
  CommentInput,
  PublishCommentButton,
  RemoveEditButtonsContainer,
  RemovePostButton,
  RemovePostIcon,
  EditPostButton,
};

// };   // styles for FeedPage=
