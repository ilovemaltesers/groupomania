import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { FaTelegramPlane } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useAuth } from "../contexts/AuthContext";

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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
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

const NewPost = () => {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const { isAuthenticated, auth } = useAuth();

  useEffect(() => {
    // Load posts from local storage when the component mounts
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  useEffect(() => {
    // Save posts to local storage whenever posts state changes
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (comment || image) {
      setPosts([
        ...posts,
        { comment, image, comments: [], userId: auth.userId },
      ]);
      setComment("");
      setImage(null);
    }
  };

  const handleAddComment = (postIndex, newComment) => {
    const updatedPosts = posts.map((post, index) => {
      if (index === postIndex) {
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleRemovePost = (postIndex) => {
    if (posts[postIndex].userId === auth.userId) {
      const updatedPosts = [...posts];
      updatedPosts.splice(postIndex, 1);
      setPosts(updatedPosts);
    } else {
      console.log("You are not authorized to remove this post.");
    }
  };

  const handleEditPost = (postIndex) => {
    // Placeholder for edit post functionality
    console.log(`Editing post ${postIndex}`);
  };

  return (
    <FeedMainContainer>
      <NewPostBody>
        <TellMeText>So what do you wish to publish today?</TellMeText>
        <NewPostTextarea
          placeholder="Write your comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <NewPostButtonContainer>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="upload-image"
          />
          <UploadImageButton
            onClick={() => document.getElementById("upload-image").click()}
          >
            Upload Image
            <PlaneIcon />
          </UploadImageButton>
          <SubmitNewPostButton onClick={handleSubmit}>
            Submit
          </SubmitNewPostButton>
        </NewPostButtonContainer>
        {image && (
          <div>
            <img
              src={image}
              alt="Uploaded"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          </div>
        )}
      </NewPostBody>

      {posts.map((post, index) => (
        <PostCard key={index}>
          {post.comment && <p>{post.comment}</p>}
          {post.image && (
            <img src={post.image} alt="Post" style={{ maxWidth: "100%" }} />
          )}
          <CommentSection>
            {post.comments.map((cmt, cmtIndex) => (
              <p key={cmtIndex}>{cmt}</p>
            ))}
            {isAuthenticated && post.userId === auth.userId && (
              <RemoveEditButtonsContainer>
                <RemovePostButton onClick={() => handleRemovePost(index)}>
                  Remove Post
                  <RemovePostIcon />
                </RemovePostButton>
                <EditPostButton onClick={() => handleEditPost(index)}>
                  Edit Post
                </EditPostButton>
              </RemoveEditButtonsContainer>
            )}
            <CommentInput
              placeholder="Write a comment..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment(index, e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <PublishCommentButton
              onClick={(e) => {
                const input = e.target.previousSibling;
                if (input && input.value.trim()) {
                  handleAddComment(index, input.value);
                  input.value = "";
                }
              }}
            >
              Publish Comment
            </PublishCommentButton>
          </CommentSection>
        </PostCard>
      ))}
    </FeedMainContainer>
  );
};

export default NewPost;
