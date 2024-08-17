import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
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
  CreatorNameContainer,
  CreatorNameText,
} from "../styles/stylesFeedPage";

const NewPost = () => {
  const { isAuthenticated, auth } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/post", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      console.log("Posts data:", response.data);
      setPosts(response.data);
      localStorage.setItem("posts", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [auth.token]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    if (savedPosts.length > 0) {
      setPosts(savedPosts);
    } else {
      fetchPosts();
    }

    const intervalId = setInterval(fetchPosts, 5000); // Fetch posts every 5 seconds
    return () => clearInterval(intervalId);
  }, [fetchPosts]);

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
              Authorization: `Bearer ${auth.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Post created successfully:", response.data);

        setContent("");
        setImage(null);

        const newPost = {
          given_name: auth.givenName,
          family_name: auth.familyName,
          post_id: response.data.post.post_id,
          content: response.data.post.content,
          media_upload: response.data.post.media_upload,
          profile_picture: auth.profilePicture,
          user_id: auth.userId,
          created_at: response.data.post.created_at,
          updated_at: response.data.post.updated_at,
          comments: [],
        };

        setPosts([newPost, ...posts]);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  const handleAddComment = async (postIndex, newComment) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex].comments.push(newComment);
    setPosts(updatedPosts);

    // Optionally, send the comment to the server here
  };

  const handleRemovePost = async (postIndex) => {
    const postToDelete = posts[postIndex];

    // Convert IDs to numbers to ensure comparison
    const postOwnerId = Number(postToDelete.user_id);
    const currentUserId = Number(auth.userId);

    if (postOwnerId !== currentUserId) {
      console.log("You are not authorized to remove this post.");
      return;
    }

    const url = `http://localhost:3000/api/post/${postToDelete.post_id}`;

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

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
    console.log(`Editing post with ID ${posts[postIndex].post_id}`);
    // Implement edit functionality here
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
        .map((post, index) => {
          const postUserId =
            typeof post.user_id === "string"
              ? Number(post.user_id)
              : post.user_id;
          const authUserId =
            typeof auth.userId === "string" ? Number(auth.userId) : auth.userId;

          const isPostOwner = postUserId === authUserId;

          return (
            <PostCard key={`${post.post_id}-${index}`}>
              <CreatorNameContainer>
                {post.profile_picture ? (
                  <Avatar
                    src={`http://localhost:3000/${post.profile_picture}`}
                    alt="Profile"
                    onError={(e) => {
                      e.target.src = "/path/to/default-avatar.png";
                    }}
                  />
                ) : (
                  <EmptyAvatarIcon />
                )}
                <CreatorNameText>
                  {post.given_name} {post.family_name}
                </CreatorNameText>
              </CreatorNameContainer>

              {post.content && <p>{post.content}</p>}

              {post.media_upload && (
                <StyledImage
                  src={
                    post.media_upload.startsWith("http")
                      ? post.media_upload
                      : `http://localhost:3000/${post.media_upload}`
                  }
                  alt="Post"
                  onError={(e) => {
                    e.target.style.display = "none"; // Hide broken image
                  }}
                  style={{ maxWidth: "100%" }}
                />
              )}

              <CommentSection>
                {isAuthenticated && isPostOwner && (
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
                      event.target.value = ""; // Clear input after adding comment
                    }
                  }}
                />
                <PublishCommentButton
                  onClick={() => {
                    // Optionally handle comment publish button click
                  }}
                >
                  Publish
                </PublishCommentButton>
              </CommentSection>
            </PostCard>
          );
        })}
    </FeedMainContainer>
  );
};

export default NewPost;
