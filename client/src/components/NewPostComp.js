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
  DefaultAvatarIcon,
  PostText,
  CommentNameText,
  CommentText,
  RubbishBin,
  RubbishBinDeletePost,
  EditPostIcon,
  NoCommentsText,
} from "../styles/stylesFeedPage";

import EditPostPopUp from "../components/EditPostPopUp";
import CommentTextarea from "../components/CommentInput";

// import DeleteCommentButton from "../components/DeleteComment";
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
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (auth && auth.profilePicture) {
      setProfilePicture(auth.profilePicture);
    } else {
      setProfilePicture(null); // Clear the profile picture if none is set
    }
  }, [auth.profilePicture]); // Track changes to profilePicture

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/post`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (Array.isArray(response.data)) {
        const postsWithDefaults = response.data.map((post) => ({
          ...post,
          likes_count: post.likes_count || 0,
          is_liked: post.is_liked || false,
          profile_picture: post.profile_picture || "",
          comments: post.comments.map((comment) => ({
            ...comment,
            user_id: comment.user_id || "",

            given_name: comment.given_name || "Anonymous",
            family_name: comment.family_name || "",
            profile_picture: comment.profile_picture || "",
          })),
          is_owner: post.user_id === auth.userId,
        }));

        const sortedPosts = postsWithDefaults.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setPosts(sortedPosts);
      } else {
        console.error("Fetched data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [auth.token]);

  useEffect(() => {
    if (auth.token) {
      fetchPosts();
    }
  }, [fetchPosts]);

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
          `${process.env.REACT_APP_API_URL}/post`,
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
          given_name: auth.givenName,
          family_name: auth.familyName,
          comments: [],
          isLiked: false,
          likes_count: response.data.post.likes_count || 0,
        };

        setPosts((prevPosts) => [newPost, ...prevPosts]);

        setContent("");
        setImage(null);

        // Fetch the latest posts after adding a new one
        fetchPosts();
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  const handleAddComment = async (post_id, postIndex, newComment) => {
    const userName = `${auth.givenName || ""} ${auth.familyName || ""}`.trim();

    // Optimistically update the local state
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      if (updatedPosts[postIndex]) {
        updatedPosts[postIndex].comments =
          updatedPosts[postIndex].comments || [];
        updatedPosts[postIndex].comments.unshift({
          ...newComment,
          user_id: auth.userId,
          userName: userName,
          profile_picture: auth.profilePicture,
        });
      }
      return updatedPosts;
    });

    setContent("");

    try {
      const token = auth.token;

      await axios.post(
        `${process.env.REACT_APP_API_URL}/comment/${post_id}`,
        { comment_text: newComment.comment_text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Fetch the latest posts after adding a comment
      fetchPosts();
    } catch (error) {
      console.error("Error posting comment:", error);
      // Handle the error appropriately, e.g., rollback optimistic update
      setPosts((prevPosts) => {
        const updatedPosts = [...prevPosts];
        if (updatedPosts[postIndex]) {
          updatedPosts[postIndex].comments = updatedPosts[
            postIndex
          ].comments.filter(
            (comment) => comment.comment_text !== newComment.comment_text
          );
        }
        return updatedPosts;
      });

      alert("There was an error adding your comment. Please try again.");
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      // Optimistically update the state before making the API call
      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
          if (post.post_id === postId) {
            // Filter out the comment with the matching commentId
            const updatedComments = post.comments.filter(
              (comment) => comment.comment_id !== commentId
            );
            return {
              ...post,
              comments: updatedComments,
            };
          }
          return post;
        });
      });

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
    } catch (error) {
      console.error(
        "Error deleting comment:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleRemovePost = async (postId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/post/${postId}`,
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

      // Check if the user uploaded a new image; otherwise, append the existing image URL
      if (updatedPost.image) {
        formData.append("image", updatedPost.image);
      } else if (updatedPost.media_upload) {
        formData.append("existing_image", updatedPost.media_upload);
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/post/${updatedPost.post_id}`,
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
        `${process.env.REACT_APP_API_URL}/like/${postId}`,
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
          post.post_id === postId
            ? {
                ...post,
                likes_count: likesCount,
                is_liked: likesCount > 0 ? true : false,
              }
            : post
        )
      );

      const updatedPosts = posts.map((post) =>
        post.post_id === postId ? { ...post, likes_count: likesCount } : post
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
              {post.profile_picture ? (
                <Avatar
                  src={`http://localhost:3000/${post.profile_picture}`}
                  alt="Profile"
                />
              ) : (
                <DefaultAvatarIcon />
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
            {/* Use PostText for rendering post content */}
            {post.content && <PostText>{post.content}</PostText>}

            {post.media_upload && (
              <StyledImage
                src={post.media_upload}
                alt="Post Media"
                onError={(e) => {
                  <DefaultAvatarIcon />;
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

              {isAuthenticated && post?.user_id === auth?.userId && (
                <RemoveEditButtonsContainer>
                  <EditPostButton onClick={() => handleEditPost(post.post_id)}>
                    <span className="text">Edit</span>
                    <EditPostIcon />
                  </EditPostButton>
                  <RemovePostButton
                    onClick={() => handleRemovePost(post.post_id)}
                  >
                    <span className="text">Remove </span>
                    <RubbishBinDeletePost />
                  </RemovePostButton>
                </RemoveEditButtonsContainer>
              )}
            </ControlsContainer>

            <CommentSection>
              {post.comments && post.comments.length > 0 ? ( // Ensure comments exist and have length
                post.comments.map((comment, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
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
                          {comment.profile_picture ? (
                            <img
                              src={`http://localhost:3000/${comment.profile_picture}`}
                              alt="User Profile"
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <DefaultAvatarIcon />
                          )}
                        </div>
                        <div>
                          <CommentNameText>
                            {comment.given_name + " " + comment.family_name}
                          </CommentNameText>
                          <CommentText>{comment.comment_text}</CommentText>
                        </div>
                        {comment.user_id === Number(auth.userId) && (
                          <RubbishBin
                            onClick={() =>
                              handleDeleteComment(
                                post.post_id,
                                comment.comment_id
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <NoCommentsText>No comments available.</NoCommentsText>
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
                    {profilePicture ? (
                      <img
                        src={`http://localhost:3000/${profilePicture}`}
                        alt="User Profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <DefaultAvatarIcon />
                    )}
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
                      onClick={() => {
                        handleAddComment(post.post_id, index, {
                          userName: `${auth.givenName} ${auth.familyName}`,
                          comment_text: content,
                          profile_picture: auth.profilePicture,
                        });
                      }}
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
