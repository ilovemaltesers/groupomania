import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  FeedMainContainer,
  NewPostBody,
  TellMeText,
  NewPostTextarea,
  NewPostButtonContainer,
  SubmitNewPostButton,
  UploadImageButton,
  PostCard,
  CommentSection,
  RemoveEditButtonsContainer,
  RemovePostButton,
  RemovePostIcon,
  PlaneIcon,
  EditPostButton,
  CommentInput,
  PublishCommentButton,
} from "../styles/stylesFeedPage";

const NewPost = () => {
  const { isAuthenticated, auth } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  // Load posts from local storage on component mount
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  // Update local storage when posts state changes
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleCommentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (content || image) {
      try {
        // Create FormData object
        const formData = new FormData();
        formData.append("content", content);
        if (image) {
          formData.append("image", image);
        }

        // Send FormData to backend API
        const response = await axios.post(
          "http://localhost:3000/api/post",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data", // Important for sending files
            },
          }
        );

        // Handle response
        console.log("Post created successfully:", response.data);
        setContent("");
        setImage(null);

        // Update local state with new post
        const newPost = {
          content: content,
          image: image ? URL.createObjectURL(image) : null,
          userId: auth.userId,
          comments: [],
        };
        setPosts([...posts, newPost]);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  const handleAddComment = (postIndex, newComment) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex].comments.push(newComment);
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
    console.log(`Editing post ${postIndex}`);
  };

  return (
    <FeedMainContainer>
      <NewPostBody>
        <TellMeText>So what do you wish to publish today?</TellMeText>
        <NewPostTextarea
          placeholder="Write your comment..."
          value={content}
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
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          </div>
        )}
      </NewPostBody>

      {/* Display all posts/comments */}
      {posts.map((post, index) => (
        <PostCard key={index}>
          {post.content && <p>{post.content}</p>}
          {post.image && (
            <img src={post.image} alt="Post" style={{ maxWidth: "100%" }} />
          )}
          <CommentSection>
            {/* Buttons for removing/editing a post (if authenticated and owner) */}
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
