import axios from "axios";
import React, { useState, useEffect } from "react";
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
} from "../styles/stylesFeedPage";
import EditPostPopUp from "../components/EditPostPopUp";

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

  // The fetchPosts function remains the same, but make sure it's inside the component
  const fetchPosts = async () => {
    try {
      // Attempt to load posts from localStorage first
      const localPosts =
        JSON.parse(localStorage.getItem(`posts_${userId}`)) || [];
      setPosts(localPosts); // Display cached posts immediately

      // Fetch posts from the API
      const response = await axios.get("http://localhost:3000/api/post", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (Array.isArray(response.data)) {
        const postsWithDefaults = response.data.map((post) => ({
          ...post,
          likesCount: Number(post.likes_count) || 0, // Ensure likesCount is a number
          isLiked: post.isLiked || false,
        }));

        // Save the posts to localStorage for future reference
        localStorage.setItem(
          `posts_${userId}`,
          JSON.stringify(postsWithDefaults)
        );
        setPosts(postsWithDefaults); // Update the state with fresh posts from the API
      } else {
        console.error("Fetched data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // useEffect to call fetchPosts when component mounts
  useEffect(() => {
    fetchPosts();
    // Since you only want this to run once on mount, you can leave the dependency array empty
  }, []);

  // Handle new post submission
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
          comments: [],
          isLiked: false,
          likesCount: Number(response.data.post.likes_count) || 0, // Use new field name
        };

        // Update posts and local storage
        const updatedPosts = [newPost, ...posts];
        localStorage.setItem(`posts_${userId}`, JSON.stringify(updatedPosts));
        setPosts(updatedPosts);
        setContent("");
        setImage(null);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  // Handle adding a comment
  const handleAddComment = (postIndex, newComment) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      if (updatedPosts[postIndex]) {
        updatedPosts[postIndex].comments =
          updatedPosts[postIndex].comments || [];
        updatedPosts[postIndex].comments.push(newComment);
      }
      return updatedPosts;
    });
  };

  // Handle removing a post
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

  // Handle editing a post
  const handleEditPost = (postId) => {
    const post = posts.find((post) => post.post_id === postId);
    if (post) {
      setPostToEdit(post);
      setShowEditPostPopUp(true);
    }
  };

  // Handle saving edited post
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
                likesCount: Number(response.data.post.likes_count) || 0, // Convert to number and use new field name
              }
            : post
        );

        // Update posts and local storage
        localStorage.setItem(`posts_${userId}`, JSON.stringify(updatedPosts));
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

  // Handle like toggle
  const handleLikeToggle = async (postId) => {
    const post = posts.find((post) => post.post_id === postId);
    if (!post) return;

    const updatedPost = {
      ...post,
      isLiked: !post.isLiked,
      likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
    };

    console.log("Updated Post:", updatedPost); // Debug log

    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.post_id === postId ? updatedPost : p))
    );

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

      if (response.status === 200 || response.status === 201) {
        const { likesCount, isLiked } = response.data;

        console.log("Server Response:", response.data); // Debug log

        setPosts((prevPosts) => {
          const updatedPosts = prevPosts.map((p) =>
            p.post_id === postId
              ? { ...p, likesCount: Number(likesCount), isLiked }
              : p
          );
          localStorage.setItem(`posts_${userId}`, JSON.stringify(updatedPosts));
          return updatedPosts;
        });
      } else {
        console.error("Failed to update like status:", response.data);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  return (
    <FeedMainContainer>
      <NewPostBody>
        <TellMeText>So what do you wish to publish today?</TellMeText>
        <NewPostTextarea
          placeholder="Write your comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <NewPostButtonContainer>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
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

          return (
            <PostCard key={post.post_id}>
              <CreatorNameContainer>
                {post.profile_picture ? (
                  <Avatar
                    src={`http://localhost:3000/${post.profile_picture}`}
                    alt="Profile"
                    onError={(e) => {
                      e.target.src = "";
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
                  src={post.media_upload}
                  alt="Post Media"
                  onError={(e) => {
                    e.target.src = "/path/to/default-image.jpg";
                  }}
                />
              )}

              {/* Likes and Comments section */}
              <ControlsContainer>
                <LikesandCommentsIconContainer>
                  <HeartIconContainer>
                    {isAuthenticated && postUserId !== authUserId ? (
                      post.isLiked ? (
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
                        {post.isLiked ? <FullHeartIcon /> : <EmptyHeartIcon />}
                      </div>
                    )}
                    <HeartCounterContainer>
                      <CounterNumber>{post.likesCount}</CounterNumber>
                    </HeartCounterContainer>
                  </HeartIconContainer>
                  <CommentIconContainer>
                    <CommentIcon />
                    <CommentCounterContainer>
                      <CounterNumber>{post.likesCount}</CounterNumber>
                    </CommentCounterContainer>
                  </CommentIconContainer>
                </LikesandCommentsIconContainer>

                {isAuthenticated && postUserId === authUserId && (
                  <RemoveEditButtonsContainer>
                    <EditPostButton
                      onClick={() => handleEditPost(post.post_id)}
                    >
                      Edit 🪄✨
                    </EditPostButton>
                    <RemovePostButton
                      onClick={() => handleRemovePost(post.post_id)}
                    >
                      Remove 🗑️
                    </RemovePostButton>
                  </RemoveEditButtonsContainer>
                )}
              </ControlsContainer>

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
                        e.target.value = "";
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
