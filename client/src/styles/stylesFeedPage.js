import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { FaTelegramPlane } from "react-icons/fa";
import { MdFace2 } from "react-icons/md";
import { RiHeartsLine, RiHeartsFill } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";

// Style for the created at text
const CreatedAtText = styled.p`
  font-size: 0.8em;
  color: black;
  margin: 0;
  font-style: italic;
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

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const RemoveEditButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

// Remove Post Button
const RemovePostButton = styled.button`
  background-color: #bdebff;
  color: black;
  padding: 10px 20px; /* Padding for size */
  width: 120px; /* Fixed width to ensure consistent size */
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: center; /* Ensures text is centered */
  &:hover {
    background-color: #e74c3c;
  }
`;

// Edit Post Button
const EditPostButton = styled.button`
  background-color: #bdebff;
  color: black;
  padding: 10px 20px; /* Padding for size */
  width: 120px; /* Fixed width to ensure consistent size */
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: center; /* Ensures text is centered */
  &:hover {
    background-color: bisque;
  }
`;

const LikesandCommentsIconContainer = styled.div`
  display: flex;
  align-items: center; /* Center items vertically within the container */
  justify-content: center; /* Center items horizontally within the container */
  width: 100%; /* Ensure it spans the full width */
  padding: 5px 0; /* Padding for spacing */
`;

// Container for the heart icon and its counter
const HeartIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center the icon within its container */
  margin-right: 10px; /* Space between the heart and comment icon containers */
  width: 60px; /* Adjusted width to accommodate the counter */
`;

// Container for the comment icon and its counter
const CommentIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center the icon within its container */
  width: 60px; /* Adjusted width to accommodate the counter */
`;

// Heart icon with a counter
const EmptyHeartIcon = styled(RiHeartsLine)`
  font-size: 2em;
  color: #5a5a5a;
  cursor: pointer;
`;

const FullHeartIcon = styled(RiHeartsFill)`
  font-size: 2em;
  color: fuchsia;
  cursor: pointer;
`;

const CommentIcon = styled(FaRegComment)`
  font-size: 1.5em;
  color: #5a5a5a;
  cursor: pointer;
`;

// Container for the heart counter
const HeartCounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

// Container for the comment counter
const CommentCounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

// Style for the counter number
const CounterNumber = styled.span`
  font-size: 1em;
  color: black;
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
  EditPostButton,
  EmptyAvatarIcon,
  Avatar,
  CreatorNameContainer,
  NameAndCreatedAtContainer,
  CreatorNameText,
  CreatedAtText,
  ControlsContainer,
  LikesandCommentsIconContainer,
  HeartIconContainer,
  CommentIconContainer,
  EmptyHeartIcon,
  FullHeartIcon,
  CommentIcon,
  HeartCounterContainer,
  CommentCounterContainer,
  CounterNumber,
};
