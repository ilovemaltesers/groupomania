import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { FaTelegramPlane } from "react-icons/fa";
import { MdFace2 } from "react-icons/md";
import { RiHeartsLine, RiHeartsFill } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { BsEnvelopeHeart } from "react-icons/bs";
import { IoTrashBinOutline } from "react-icons/io5";

const RubbishBin = styled(IoTrashBinOutline)`
  font-size: 30px;
  color: ${({ theme }) => theme.quinary};
  margin-left: 25px;
  margin-top: 15px;
`;

const DefaultAvatarIcon = styled(MdFace2)`
  font-size: 50px; /* Match the size of the Avatar */
  margin-right: 10px; /* Space between icon and text */
  line-height: 1; /* Aligns icon and text vertically */
`;

// Style for the created at text
const CreatedAtText = styled.p`
  font-size: 0.8em;
  color: ${({ theme }) => theme.quinary};
  margin: 0;
  font-style: italic;
`;

// Style for the creator's name text
const CreatorNameText = styled.h3`
  font-size: 1.5em;
  margin: 0; /* Adjust as needed */
  line-height: 1.5; /* Ensure vertical alignment */
  color: ${({ theme }) => theme.quinary};
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
  color: ${({ theme }) => theme.quinary};
`;

// Style for the main container of the feed
const FeedMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
  min-height: 100vh;
`;

// Style for the new post body card
const NewPostBody = styled(Card)`
  width: 100%;
  max-width: 500px;
  margin: 20px 0;
  padding: 20px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.boxShadow};
  border-radius: 25px;
  background-color: ${({ theme }) => theme.card_background};
`;

// Style for the "Tell me" text
const TellMeText = styled.h4`
  font-size: 1.25em;
  color: ${({ theme }) => theme.quinary};
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

const ImagePreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
`;

// Style for the submit new post button
const SubmitNewPostButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.button_text_deselected};

  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) =>
      theme.secondary}; /* Change hover color to use theme */
    color: ${({ theme }) => theme.button_text_deselected};
  }
`;

// Style for the upload image button
const UploadImageButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.button_text_deselected};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: ${({ theme }) =>
      theme.secondary}; /* Change hover color to use theme */
    color: ${({ theme }) => theme.button_text_deselected};
  }
`;

// Style for the plane icon in the new post form
const PlaneIcon = styled(FaTelegramPlane)`
  margin-left: 7px;
  font-size: 1.25em;
  color: ${({ theme }) => theme.button_text_deselected};
`;

// Style for the post card
const PostCard = styled(Card)`
  width: 100%;
  max-width: 500px;
  margin: 10px 0;
  padding: 20px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.boxShadow};
  border-radius: 25px;
  background-color: ${({ theme }) => theme.card_background};
`;

const PostText = styled.p`
  font-size: 1em; /* Adjust font size for the post text */
  color: ${({ theme }) => theme.quinary}; /* Text color from theme */
  line-height: 1.5; /* Line height for better readability */
  margin: 0 0 15px; /* Add margin to space out the post text from other elements */
  word-wrap: break-word; /* Ensure long text wraps within the container */
  text-align: left; /* Align text to the left (adjust if needed) */
`;

// Style for images in posts
const StyledImage = styled.img`
  border-radius: 3%;
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

const EditPostButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.button_text_deselected};
  padding: 10px 30px; /* Default padding for larger screens */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  white-space: nowrap; /* Prevent text from wrapping */
  font-size: 1em; /* Default font size */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) =>
      theme.secondary}; /* Change hover color to use theme */
    color: ${({ theme }) => theme.button_text_deselected};
  }

  /* Medium Screen (Tablets) */
  @media (max-width: 768px) {
    padding: 8px 20px; /* Reduced padding for medium screens */
    font-size: 0.9em; /* Slightly smaller font for medium screens */
  }

  /* Small Screen (Mobile) */
  @media (max-width: 410px) {
    padding: 6px 15px; /* Reduced padding for small screens */
    font-size: 0.85em; /* Smaller font size for small screens */

    /* Hide the text and only show emoji */
    & .text {
      display: none;
    }
  }
`;

// Remove Post Button
const RemovePostButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.button_text_deselected};
  padding: 10px 30px; /* Default padding for larger screens */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  white-space: nowrap; /* Prevent text from wrapping */
  font-size: 1em; /* Default font size */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) =>
      theme.secondary}; /* Change hover color to use theme */
    color: ${({ theme }) => theme.button_text_deselected};
  }

  /* Medium Screen (Tablets) */
  @media (max-width: 768px) {
    padding: 8px 20px; /* Reduced padding for medium screens */
    font-size: 0.9em; /* Slightly smaller font for medium screens */
  }

  /* Small Screen (Mobile) */
  @media (max-width: 410px) {
    padding: 6px 15px; /* Reduced padding for small screens */
    font-size: 0.85em; /* Smaller font size for small screens */

    /* Hide the text and only show emoji */
    & .text {
      display: none;
    }
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
  color: ${({ theme }) => theme.quinary};
  cursor: pointer;
`;

const FullHeartIcon = styled(RiHeartsFill)`
  font-size: 2em;
  color: ${({ theme }) => theme.tertiary};
  cursor: pointer;
`;

const CommentIcon = styled(FaRegComment)`
  font-size: 1.5em;
  color: ${({ theme }) => theme.quinary};
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
  color: ${({ theme }) => theme.quinary};
`;

const CommentSection = styled.div`
  align-items: center; /* Align avatar and input vertically centered */
  margin-top: 10px;
  padding: 10px; /* Padding to ensure content is not touching edges */
`;

const CommentNameText = styled.p`
  font-size: 1em; /* Adjust font size as needed */
  font-weight: bold; /* Bold text for comment names */
  color: ${({ theme }) => theme.quinary}; /* Use the theme's primary color */
  margin: 0; /* Ensure no extra margins */
`;

const CommentText = styled.p`
  font-size: 0.9em; /* Slightly smaller than the name */
  color: ${({ theme }) => theme.quinary}; /* Use theme's text color */
  margin: 0; /* Ensure no extra margins */
  line-height: 1.4; /* Add some line spacing for readability */
`;

const CommentAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 62px;
  height: 50px;
  margin-left: -15px;
  margin-right: 10px;
  margin-top: 8px;

  border-radius: 50%;
`;

const CommentAvatar = styled.div`
  width: 40px; /* Adjust size as needed */
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.avatarBackground};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CommentAvatarPlaceholder = styled(IoPersonCircleSharp)`
  font-size: 50px;
  color: #919bab;
`;

// Style for the publish comment button
const PublishCommentButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.button_text_deselected};
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const SubmitCommentContainer = styled.div`
  display: flex;
  align-items: center;

  height: 10px;
`;

const LetterIconBtn = styled(BsEnvelopeHeart)`
  font-size: 40px;
  color: ${({ theme }) => theme.quinary};

  margin-left: 8px;
  &:hover {
    color: ${({ theme }) => theme.tertiary};
  }
`;

const NoCommentsText = styled.p`
  font-size: 1em;
  color: ${({ theme }) => theme.quinary};
  margin: 0;
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
  CommentAvatarContainer,
  CommentAvatarPlaceholder,
  CommentAvatar,
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
  ImagePreviewContainer,
  PreviewImage,
  SubmitCommentContainer,
  LetterIconBtn,
  DefaultAvatarIcon,
  PostText,
  CommentNameText,
  CommentText,
  RubbishBin,
  NoCommentsText,
};
