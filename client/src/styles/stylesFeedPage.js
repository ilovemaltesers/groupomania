import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { FaTelegramPlane } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdFace2 } from "react-icons/md";

// Style for the created at text
const CreatedAtText = styled.p`
  font-size: 0.8em;
  color: black;
  margin: 0;
`;

// Style for the creator's name text
const CreatorNameText = styled.h3`
  font-size: 1.5em;
  margin: 0; /* Adjust as needed */
  line-height: 1.5; /* Ensure vertical alignment */
`;

// Style for the container holding the creator's name and created at text
const NameAndCreatedAtContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// Style for the container holding the avatar/icon and name/created at texts
const CreatorNameContainer = styled.div`
  display: flex;
  align-items: flex-start; /* Align items to the start vertically */
  margin-bottom: 15px;
`;

// Style for the avatar image
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  margin-bottom: 15px;
  margin-top: 5px;
`;

// Style for the empty avatar icon
const EmptyAvatarIcon = styled(MdFace2)`
  font-size: 50px; /* Match the size of the Avatar */
  margin-right: 10px; /* Space between icon and text */
  line-height: 1; /* Aligns icon and text vertically */
`;

// Style for the main container of the feed
const FeedMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f9fc;
  padding: 20px;
`;

// Style for the new post body card
const NewPostBody = styled(Card)`
  width: 100%;
  max-width: 500px;
  margin: 20px 0;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(175, 228, 236);
  border-radius: 3%;
`;

// Style for the "Tell me" text
const TellMeText = styled.h4`
  font-size: 1.25em;
`;

// Style for the textarea in the new post form
const NewPostTextarea = styled.textarea`
  width: 100%;
  min-height: 3em;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

// Style for the container holding the new post buttons
const NewPostButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

// Style for the submit new post button
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

// Style for the upload image button
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

// Style for the plane icon in the new post form
const PlaneIcon = styled(FaTelegramPlane)`
  margin-left: 7px;
  font-size: 1.25em;
`;

// Style for the post card
const PostCard = styled(Card)`
  width: 100%;
  max-width: 500px;
  margin: 10px 0;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(175, 228, 236);
  border-radius: 3%;
`;

// Style for images in posts
const StyledImage = styled.img`
  border-radius: 3%;
`;

// Style for the comment section
const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

// Style for the comment input textarea
const CommentInput = styled.textarea`
  width: 100%;
  min-height: 2em;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-top: 10px;
`;

// Style for the publish comment button
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

// Style for the container holding the remove and edit buttons
const RemoveEditButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 10px;
`;

// Style for the remove post button
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

// Style for the remove post icon
const RemovePostIcon = styled(RiDeleteBin6Fill)`
  font-size: 1.25em;
  margin-left: 10px;
  margin-bottom: 5px;
`;

// Style for the edit post button
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

// Export all the styled components
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
  EmptyAvatarIcon,
  Avatar,
  CreatorNameContainer,
  NameAndCreatedAtContainer,
  CreatorNameText,
  CreatedAtText,
};
