import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { FaTelegramPlane } from "react-icons/fa";
import { MdFace2 } from "react-icons/md";
import { RiHeartsLine, RiHeartsFill } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { BsEnvelopeHeart } from "react-icons/bs";
import { IoTrashBinOutline } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";

const EditPostIcon = styled(GrEdit)`
  margin-left: 7px;
  font-size: 1.25em;
  color: ${({ theme }) => theme.button_text_deselected};
`;

const RubbishBinDeletePost = styled(IoTrashBinOutline)`
  margin-left: 7px;
  font-size: 1.25em;
  color: ${({ theme }) => theme.button_text_deselected};
`;

const RubbishBin = styled(IoTrashBinOutline)`
  font-size: 30px;
  color: ${({ theme }) => theme.quinary};
  margin-left: 25px;
  margin-top: 15px;
`;

const DefaultAvatarIcon = styled(MdFace2)`
  font-size: 50px;
  margin-right: 10px;
  line-height: 1;
`;

const CreatedAtText = styled.p`
  font-size: 0.8em;
  color: ${({ theme }) => theme.quinary};
  margin: 0;
  font-style: italic;
`;

const CreatorNameText = styled.h3`
  font-size: 1.5em;
  margin: 0;
  line-height: 1.5;
  color: ${({ theme }) => theme.quinary};
`;

// Style for the container holding the creator's name and created a text
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
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.button_text_deselected};
  }
`;

const PlaneIcon = styled(FaTelegramPlane)`
  margin-left: 7px;
  font-size: 1.25em;
  color: ${({ theme }) => theme.button_text_deselected};
`;

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
  font-size: 1em;
  color: ${({ theme }) => theme.quinary};
  line-height: 1.5;
  margin: 0 0 15px;
  word-wrap: break-word;
  text-align: left;
`;

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
  padding: 10px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  white-space: nowrap;
  font-size: 1em;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.button_text_deselected};
  }

  /* Medium Screen (Tablets) */
  @media (max-width: 768px) {
    padding: 8px 20px;
    font-size: 0.9em;
  }

  /* Small Screen (Mobile) */
  @media (max-width: 410px) {
    padding: 6px 15px;
    font-size: 0.85em;

    /* Hide the text and only show emoji */
    & .text {
      display: none;
    }
  }
`;

const RemovePostButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.button_text_deselected};
  padding: 10px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  white-space: nowrap;
  font-size: 1em;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.button_text_deselected};
  }

  /* Medium Screen (Tablets) */
  @media (max-width: 768px) {
    padding: 8px 20px;
    font-size: 0.9em;
  }

  /* Small Screen (Mobile) */
  @media (max-width: 410px) {
    padding: 6px 15px;
    font-size: 0.85em;

    & .text {
      display: none;
    }
  }
`;

const LikesandCommentsIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5px 0;
`;

const HeartIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 60px;
`;

const CommentIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
`;

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

const HeartCounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const CommentCounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const CounterNumber = styled.span`
  font-size: 1em;
  color: ${({ theme }) => theme.quinary};
`;

const CommentSection = styled.div`
  align-items: center;
  margin-top: 10px;
  padding: 10px;
`;

const CommentNameText = styled.p`
  font-size: 1em;
  font-weight: bold;
  color: ${({ theme }) => theme.quinary};
  margin: 0;
`;

const CommentText = styled.p`
  font-size: 0.9em;
  color: ${({ theme }) => theme.quinary};
  margin: 0;
  line-height: 1.4;
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
  width: 40px;
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
  RubbishBinDeletePost,
  EditPostIcon,
  NoCommentsText,
};
