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
  StyledImage,
  CommentSection,
  RemoveEditButtonsContainer,
  RemovePostButton,
  RemovePostIcon,
  PlaneIcon,
  EditPostButton,
  CommentInput,
  PublishCommentButton,
  EmptyAvatarIcon,
  Avatar,
} from "../styles/stylesFeedPage";

const NewPost = () => {
  const { isAuthenticated, auth } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/post", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Posts data:", response.data);
      setPosts(response.data);
      localStorage.setItem("posts", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    if (savedPosts.length > 0) {
      setPosts(savedPosts);
    } else {
      fetchPosts();
    }

    const intervalId = setInterval(fetchPosts, 5000);
    return () => clearInterval(intervalId);
  }, []);

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
        const formData = new FormData();
        formData.append("content", content);
        if (image) {
          formData.append("image", image);
        }

        const response = await axios.post(
          "http://localhost:3000/api/post",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Post created successfully:", response.data);
        setContent("");
        setImage(null);

        const newPost = {
          content: content,
          media_upload: response.data.post.media_upload,
          profile_picture: auth.profile_picture,
          userId: auth.userId,
          id: response.data.post.post_id,
          comments: [],
        };
        setPosts([newPost, ...posts]);
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

  const handleRemovePost = async (postIndex) => {
    const postToDelete = posts[postIndex];

    if (postToDelete.userId !== auth.userId) {
      console.log("You are not authorized to remove this post.");
      return;
    }

    const url = `http://localhost:3000/api/post/${postToDelete.id}`;
    console.log("Deleting post with URL:", url);

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        const updatedPosts = posts.filter((_, index) => index !== postIndex);
        setPosts(updatedPosts);
        console.log("Post removed successfully:", response.data);
      } else {
        console.error("Failed to remove post:", response.data);
      }
    } catch (error) {
      console.error("Error removing post:", error);
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

      {posts
        .slice()
        .reverse()
        .map((post, index) => (
          <PostCard key={`${post.id}-${index}`}>
            {/* Avatar Rendering */}
            {post.profile_picture ? (
              <Avatar
                src={`http://localhost:3000/${post.profile_picture}`}
                alt="Profile"
                onError={(e) => {
                  console.error(
                    "Failed to load profile picture:",
                    post.profile_picture
                  );
                  e.target.src = "/path/to/default-avatar.png";
                }}
              />
            ) : (
              <EmptyAvatarIcon />
            )}

            {post.content && <p>{post.content}</p>}

            {/* Posted Image Rendering */}
            {post.media_upload && (
              <StyledImage
                src={
                  post.media_upload.startsWith("http")
                    ? post.media_upload
                    : `http://localhost:3000/${post.media_upload}`
                }
                alt="Post"
                onError={(e) => {
                  console.error(
                    "Failed to load post image:",
                    post.media_upload
                  );
                  e.target.style.display = "none"; // Hide broken image
                }}
                style={{ maxWidth: "100%" }}
              />
            )}

            <CommentSection>
              {isAuthenticated && post.userId === auth.userId && (
                <RemoveEditButtonsContainer>
                  <RemovePostButton onClick={() => handleRemovePost(index)}>
                    <RemovePostIcon />
                    Remove Post
                  </RemovePostButton>
                  <EditPostButton onClick={() => handleEditPost(index)}>
                    <PlaneIcon />
                    Edit Post
                  </EditPostButton>
                </RemoveEditButtonsContainer>
              )}
              <CommentInput
                placeholder="Write a comment..."
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handleAddComment(index, event.target.value);
                    event.target.value = "";
                  }
                }}
              />
              <PublishCommentButton>Publish</PublishCommentButton>
            </CommentSection>
          </PostCard>
        ))}
    </FeedMainContainer>
  );
};

export default NewPost;
