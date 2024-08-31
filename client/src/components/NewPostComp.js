import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
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
  PlaneIcon,
  EditPostButton,
  CommentInput,
  EmptyAvatarIcon,
  Avatar,
  CreatorNameContainer,
  NameAndCreatedAtContainer,
  CreatorNameText,
  CreatedAtText,
} from "../styles/stylesFeedPage";
import EditPostPopUp from "../components/EditPostPopUp";

// Function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "d 'of' MMMM yyyy 'at' h:mm a");
};

const NewPost = () => {
  // Access authentication context
  const { isAuthenticated, auth } = useAuth();
  const [content, setContent] = useState(""); // State for post content
  const [image, setImage] = useState(null); // State for uploaded image
  const [posts, setPosts] = useState([]); // State for posts
  const [showEditPostPopUp, setShowEditPostPopUp] = useState(false); // State for showing edit popup
  const [postToEdit, setPostToEdit] = useState(null); // State for the post being edited

  const userId = auth.userId; // Get the user ID from the authentication context

  // Function to fetch posts from the server
  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/post", {
        headers: {
          Authorization: `Bearer ${auth.token}`, // Include the token in the request headers
        },
      });

      if (Array.isArray(response.data)) {
        setPosts(response.data); // Update state with fetched posts
        localStorage.setItem(`posts_${userId}`, JSON.stringify(response.data)); // Save posts to localStorage
      } else {
        console.error("Fetched data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error); // Log errors if fetching fails
    }
  }, [auth.token, userId]);

  // Load posts from localStorage or fetch from the server if not available
  useEffect(() => {
    const savedPosts =
      JSON.parse(localStorage.getItem(`posts_${userId}`)) || [];
    setPosts(savedPosts.length ? savedPosts : []); // Set posts from localStorage or empty array
    if (!savedPosts.length) {
      fetchPosts(); // Fetch posts if not found in localStorage
    }
  }, [fetchPosts, userId]);

  // Update localStorage whenever posts state changes
  useEffect(() => {
    localStorage.setItem(`posts_${userId}`, JSON.stringify(posts));
  }, [posts, userId]);

  // Handle changes to the content of the new post
  const handleCommentChange = (event) => {
    setContent(event.target.value);
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Set the uploaded image file
    }
  };

  // Submit a new post
  const handleSubmit = async () => {
    if (content || image) {
      try {
        const formData = new FormData();
        formData.append("content", content);
        if (image) {
          formData.append("image", image); // Add image to form data if available
        }

        const response = await axios.post(
          "http://localhost:3000/api/post",
          formData,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`, // Include the token in the request headers
              "Content-Type": "multipart/form-data", // Specify the content type for form data
            },
          }
        );

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

        setPosts((prevPosts) => [newPost, ...prevPosts]); // Add the new post to the beginning of the posts array
        setContent(""); // Clear the content
        setImage(null); // Clear the image
      } catch (error) {
        console.error("Error creating post:", error); // Log errors if post creation fails
      }
    }
  };

  // Handle adding a comment to a post
  const handleAddComment = (postIndex, newComment) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      updatedPosts[postIndex].comments = updatedPosts[postIndex].comments || [];
      updatedPosts[postIndex].comments.push(newComment); // Add the new comment to the post
      return updatedPosts;
    });
  };

  // Handle removing a post
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
            Authorization: `Bearer ${auth.token}`, // Include the token in the request headers
          },
        }
      );

      if (response.status === 200) {
        setPosts(
          (prevPosts) => prevPosts.filter((post) => post.post_id !== postId) // Remove the post from state
        );
      } else {
        console.error("Failed to remove post:", response.data);
      }
    } catch (error) {
      console.error("Error removing post:", error); // Log errors if post removal fails
    }
  };

  // Handle editing a post
  const handleEditPost = (postId) => {
    const post = posts.find((post) => post.post_id === postId);

    if (!post) {
      console.log("Post not found.");
      return;
    }

    setPostToEdit(post); // Set the post to edit
    setShowEditPostPopUp(true); // Show the edit popup
  };

  // Save the edited post

  const handleSaveEditedPost = async (updatedPost) => {
    try {
      const formData = new FormData();
      formData.append("content", updatedPost.content || "");

      if (updatedPost.image) {
        formData.append("image", updatedPost.image); // Append the raw file
      }

      const response = await axios.put(
        `http://localhost:3000/api/post/${updatedPost.post_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        }
      );

      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.post_id === updatedPost.post_id
              ? {
                  ...post,
                  ...updatedPost,
                  media_upload: response.data.post.media_upload,
                }
              : post
          )
        );
      } else {
        console.error(
          "Failed to update the post. Server returned:",
          response.status
        );
      }
    } catch (error) {
      console.error("An error occurred while updating the post:", error);
    }
  };

  return (
    <FeedMainContainer>
      <NewPostBody>
        <TellMeText>So what do you wish to publish today?</TellMeText>
        <NewPostTextarea
          placeholder="Write your comment..."
          value={content}
          onChange={handleCommentChange} // Update content on change
        />
        <NewPostButtonContainer>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload} // Handle image upload
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

      {posts.length > 0 ? (
        posts.map((post, index) => {
          const postUserId = Number(post.user_id);
          const authUserId = Number(auth.userId);
          const isPostOwner = postUserId === authUserId;

          return (
            <PostCard key={post.post_id}>
              <CreatorNameContainer>
                {post.profile_picture ? (
                  <Avatar
                    src={`http://localhost:3000/${post.profile_picture}`}
                    alt="Profile"
                    onError={(e) => {
                      // Set to an empty src if there's an error loading the image
                      e.target.src = ""; // Ensure this does not cause a loop
                    }}
                  />
                ) : (
                  <EmptyAvatarIcon /> // Use the default icon if no profile picture
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
                  src={`http://localhost:3000/${post.media_upload}`} // Assuming the backend returns the correct path
                  alt="Post Media"
                  onError={(e) => {
                    e.target.src = "/path/to/default-image.jpg"; // Fallback in case of error
                  }}
                />
              )}

              {isPostOwner && (
                <RemoveEditButtonsContainer>
                  <EditPostButton onClick={() => handleEditPost(post.post_id)}>
                    Edit 🪄✨
                  </EditPostButton>
                  <RemovePostButton
                    onClick={() => handleRemovePost(post.post_id)}
                  >
                    Remove 🗑️
                  </RemovePostButton>
                </RemoveEditButtonsContainer>
              )}

              <CommentSection>
                {post.comments &&
                  post.comments.map((comment, commentIndex) => (
                    <div key={commentIndex}>
                      <p>
                        {comment.userName}: {comment.text}
                      </p>
                    </div>
                  ))}
                {isAuthenticated && (
                  <CommentInput
                    placeholder="Add a comment..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddComment(index, {
                          userName: auth.givenName,
                          text: e.target.value,
                        });
                        e.target.value = ""; // Clear input after adding comment
                      }
                    }}
                  />
                )}
              </CommentSection>
            </PostCard>
          );
        })
      ) : (
        <p>No posts available.</p>
      )}

      {showEditPostPopUp && postToEdit && (
        <EditPostPopUp
          post={postToEdit}
          onClose={() => setShowEditPostPopUp(false)}
          onSave={handleSaveEditedPost}
        />
      )}
    </FeedMainContainer>
  );
};

export default NewPost;
