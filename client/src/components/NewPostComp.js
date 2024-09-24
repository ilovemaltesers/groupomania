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
  HeartCounterContainer,
  CommentCounterContainer,
  CounterNumber,
  CommentIcon,
  ImagePreviewContainer,
  PreviewImage,
  SubmitCommentContainer,
  LetterIconBtn,
} from "../styles/stylesFeedPage";
import EditPostPopUp from "../components/EditPostPopUp";
import CommentTextarea from "../components/CommentInput";

// Function to format dates
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

  const userId = auth.userId;

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/post", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (Array.isArray(response.data)) {
        const postsWithDefaults = response.data.map((post) => ({
          ...post,
          likes_count: post.likes_count || 0,
          is_liked: post.is_liked || false,
        }));

        // Sort posts by 'created_at' timestamp in descending order (newest first)
        const sortedPosts = postsWithDefaults.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        console.log("Fetched posts with likes:", sortedPosts);

        setPosts(sortedPosts);
        // Clear and update local storage
        localStorage.removeItem(`posts_${auth.userId}`);
        localStorage.setItem(
          `posts_${auth.userId}`,
          JSON.stringify(sortedPosts)
        );
      } else {
        console.error("Fetched data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [auth.token, auth.userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    console.log("Posts state:", posts); // Log posts state
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

        const newPost = {
          ...response.data.post,
          user_id: auth.userId,
          profile_picture: auth.profilePicture,
          given_name: auth.givenName, // Add the user name fields here
          family_name: auth.familyName,
          comments: [],
          isLiked: false,
          likes_count: response.data.post.likes_count || 0,
        };

        setPosts((prevPosts) => [newPost, ...prevPosts]);
        localStorage.setItem(
          `posts_${userId}`,
          JSON.stringify([newPost, ...posts])
        );
        setContent("");
        setImage(null);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  const handleAddComment = async (post_id, postIndex, newComment) => {
    // if (!newComment.text.trim()) return; // Prevent adding empty comments

    // Optimistically update the local state
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts]; // Copy the posts array to avoid mutation
      if (updatedPosts[postIndex]) {
        // Ensure comments array exists and prepend new comment
        updatedPosts[postIndex].comments =
          updatedPosts[postIndex].comments || [];
        updatedPosts[postIndex].comments.unshift({
          ...newComment,
          userName: `${auth.givenName} ${auth.familyName}`, // Include both names
        });
      }
      return updatedPosts; // Return the updated state
    });

    setContent(""); // Clear the comment input field

    // Make the Axios request to the server
    try {
      const token = localStorage.getItem("token"); // Get the auth token from local storage

      // Send the POST request with correct data structure
      await axios.post(
        `http://localhost:3000/api/comment/${post_id}`,
        { comment_text: newComment.text }, // Use comment_text as per the backend requirement
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
    } catch (error) {
      console.error("Error posting comment:", error); // Handle any errors
    }
  };

  const handleRemovePost = async (postId) => {
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
        localStorage.setItem(`posts_${userId}`, JSON.stringify(updatedPosts));
      } else {
        console.error("Failed to remove post:", response.data);
      }
    } catch (error) {
      console.error("Error removing post:", error);
    }
  };

  const handleEditPost = (postId) => {
    const post = posts.find((post) => post.post_id === postId);
    if (post) {
      setPostToEdit(post);
      setShowEditPostPopUp(true);
    }
  };

  const handleSaveEditedPost = async (updatedPost) => {
    try {
      const formData = new FormData();
      formData.append("content", updatedPost.content || "");
      if (updatedPost.image) {
        formData.append("image", updatedPost.image);
      }

      const response = await axios.put(
        `http://localhost:3000/api/post/${updatedPost.post_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const updatedPosts = posts.map((post) =>
          post.post_id === updatedPost.post_id
            ? {
                ...post,
                ...updatedPost,
                media_upload: response.data.post.media_upload,
              }
            : post
        );
        setPosts(updatedPosts);
        localStorage.setItem(`posts_${userId}`, JSON.stringify(updatedPosts));
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

  const handleLikeToggle = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      const { likesCount } = response.data;

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.post_id === postId ? { ...post, likes_count: likesCount } : post
        )
      );

      const updatedPosts = posts.map((post) =>
        post.post_id === postId ? { ...post, likes_count: likesCount } : post
      );
      localStorage.setItem(
        `posts_${auth.userId}`,
        JSON.stringify(updatedPosts)
      );
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  return (
    <FeedMainContainer>
      <NewPostBody>
        <TellMeText>So what do you wish to publish today?</TellMeText>
        <NewPostTextarea
          placeholder="Write your post content..."
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
          <ImagePreviewContainer>
            <PreviewImage
              src={URL.createObjectURL(image)}
              alt="Uploaded Preview"
            />
          </ImagePreviewContainer>
        )}
      </NewPostBody>

      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <PostCard key={post.post_id}>
            <CreatorNameContainer>
              {post.profile_picture && (
                <Avatar
                  src={`http://localhost:3000/${post.profile_picture}`}
                  alt="Profile"
                  onError={(e) => {
                    e.target.src = ""; // Handle image error
                  }}
                />
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
                src={post.media_upload}
                alt="Post Media"
                onError={(e) => {
                  e.target.src = "/path/to/default-image.jpg";
                }}
              />
            )}

            <ControlsContainer>
              <LikesandCommentsIconContainer>
                <HeartIconContainer>
                  {isAuthenticated ? (
                    Number(post.user_id) === Number(auth.userId) ? (
                      <div style={{ cursor: "not-allowed" }}>
                        {post.is_liked ? <FullHeartIcon /> : <EmptyHeartIcon />}
                      </div>
                    ) : post.is_liked ? (
                      <FullHeartIcon
                        onClick={() => handleLikeToggle(post.post_id)}
                      />
                    ) : (
                      <EmptyHeartIcon
                        onClick={() => handleLikeToggle(post.post_id)}
                      />
                    )
                  ) : (
                    <div style={{ cursor: "not-allowed" }}>
                      {post.is_liked ? <FullHeartIcon /> : <EmptyHeartIcon />}
                    </div>
                  )}
                  <HeartCounterContainer>
                    <CounterNumber>{post.likes_count}</CounterNumber>
                  </HeartCounterContainer>
                </HeartIconContainer>

                <CommentIconContainer>
                  <CommentIcon />
                  <CommentCounterContainer>
                    <CounterNumber>
                      {post.comments ? post.comments.length : 0}
                    </CounterNumber>
                  </CommentCounterContainer>
                </CommentIconContainer>
              </LikesandCommentsIconContainer>

              {isAuthenticated && post.user_id === auth.userId && (
                <RemoveEditButtonsContainer>
                  <EditPostButton onClick={() => handleEditPost(post.post_id)}>
                    <span className="text">Edit</span> 🪄✨
                  </EditPostButton>
                  <RemovePostButton
                    onClick={() => handleRemovePost(post.post_id)}
                  >
                    <span className="text">Remove</span> 🗑️
                  </RemovePostButton>
                </RemoveEditButtonsContainer>
              )}
            </ControlsContainer>

            <CommentSection>
              {/* Display existing comments */}
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment, commentIndex) => (
                  <div
                    key={commentIndex}
                    style={{
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Profile Picture and Name */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginRight: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      >
                        {comment.profile_picture && (
                          <img
                            src={`http://localhost:3000/${comment.profile_picture}`} // Profile picture URL
                            alt="Profile"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%", // Circular image
                              objectFit: "cover", // Ensure the image covers the container
                            }}
                          />
                        )}
                      </div>

                      <div>
                        <p style={{ margin: "0", fontWeight: "bold" }}>
                          {comment.userName}
                        </p>
                        <p style={{ margin: "0" }}>{comment.comment_text}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}

              {/* New Comment Input Section */}
              {isAuthenticated && (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* Avatar for the user posting the comment */}
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  >
                    {auth.profilePicture ? (
                      <img
                        src={`http://localhost:3000/${auth.profilePicture}`}
                        alt="User Profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%", // Circular image
                          objectFit: "cover", // Ensure the image covers the container
                        }}
                      />
                    ) : null}
                  </div>

                  {/* Comment Textarea */}
                  <div style={{ marginLeft: "10px", flexGrow: 1 }}>
                    <CommentTextarea
                      value={content}
                      onChange={handleCommentChange}
                      placeholder="Say something..."
                    />
                  </div>

                  {/* Submit Comment Button */}
                  <SubmitCommentContainer>
                    <LetterIconBtn
                      onClick={() =>
                        handleAddComment(post.post_id, index, {
                          userName: `${auth.givenName} ${auth.familyName}`,
                          comment_text: content,
                          profile_picture: auth.profilePicture,
                        })
                      }
                    />
                  </SubmitCommentContainer>
                </div>
              )}
            </CommentSection>
          </PostCard>
        ))
      ) : (
        <p>No posts available.</p>
      )}

      {showEditPostPopUp && (
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
