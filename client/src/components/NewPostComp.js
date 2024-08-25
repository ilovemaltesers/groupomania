import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { format } from "date-fns";
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
  NameAndCreatedAtContainer,
  CreatorNameText,
  CreatedAtText,
} from "../styles/stylesFeedPage";
import EditPostPopUp from "../components/EditPostPopUp";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "d 'of' MMMM yyyy 'at' h:mm a");
};

const NewPost = () => {
  const { isAuthenticated, auth } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showEditPostPopUp, setShowEditPostPopUp] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);

  // Fetch posts from the server
  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/post", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setPosts(response.data);
      localStorage.setItem("posts", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [auth.token]);

  // Load posts from local storage or fetch from server
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    if (savedPosts.length > 0) {
      setPosts(savedPosts);
    } else {
      fetchPosts();
    }
  }, [fetchPosts]);

  // Save posts to local storage whenever posts state changes
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Handle content change in the new post textarea
  const handleCommentChange = (event) => {
    setContent(event.target.value);
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle submission of a new post
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

  // Add a comment to a specific post
  const handleAddComment = async (postIndex, newComment) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex].comments.push(newComment);
    setPosts(updatedPosts);
  };

  // Remove a post
  const handleRemovePost = async (postId) => {
    const postToDelete = posts.find((post) => post.post_id === postId);

    if (!postToDelete) {
      console.log("Post not found.");
      return;
    }

    const postOwnerId = Number(postToDelete.user_id);
    const currentUserId = Number(auth.userId);

    if (postOwnerId !== currentUserId) {
      console.log("You are not authorized to remove this post.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedPosts = posts.filter((post) => post.post_id !== postId);
        setPosts(updatedPosts);
      } else {
        console.error("Failed to remove post:", response.data);
      }
    } catch (error) {
      console.error("Error removing post:", error);
    }
  };

  // Set the post to be edited and show the popup
  const handleEditPost = (postId) => {
    const post = posts.find((post) => post.post_id === postId);
    if (post) {
      setPostToEdit(post);
      setShowEditPostPopUp(true);
    }
  };

  // Handle saving the edited post
  const handleSaveEditedPost = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.post_id === updatedPost.post_id ? updatedPost : post
    );
    setPosts(updatedPosts);
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
            <PostCard key={post.post_id}>
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
                <NameAndCreatedAtContainer>
                  <CreatorNameText>
                    {post.given_name} {post.family_name}
                  </CreatorNameText>
                  <CreatedAtText>
                    Post created {formatDate(post.created_at)}
                  </CreatedAtText>
                </NameAndCreatedAtContainer>
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
                    <RemovePostButton
                      onClick={() => handleRemovePost(post.post_id)}
                    >
                      <RemovePostIcon />
                      Remove Post
                    </RemovePostButton>

                    <EditPostButton
                      onClick={() => handleEditPost(post.post_id)}
                    >
                      <PlaneIcon />
                      Edit My Post
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

      {showEditPostPopUp && (
        <EditPostPopUp
          post={postToEdit}
          onClose={() => setShowEditPostPopUp(false)} // Close the popup
          onSave={handleSaveEditedPost} // Save changes and update posts
        />
      )}
    </FeedMainContainer>
  );
};

export default NewPost;
