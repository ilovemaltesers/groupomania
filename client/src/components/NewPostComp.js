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
  RemovePostIcon,
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
  const { isAuthenticated, auth } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showEditPostPopUp, setShowEditPostPopUp] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);

  const userId = auth?.userId;

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/post", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setPosts(response.data);
        localStorage.setItem(`posts_${userId}`, JSON.stringify(response.data));
      } else {
        console.error("Fetched data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [auth.token, userId]);

  useEffect(() => {
    if (!isAuthenticated) {
      setPosts([]);
      localStorage.removeItem(`posts_${userId}`);
      return;
    }

    const savedPosts =
      JSON.parse(localStorage.getItem(`posts_${userId}`)) || [];
    setPosts(savedPosts);

    if (!savedPosts.length) {
      fetchPosts();
    }
  }, [isAuthenticated, userId, fetchPosts]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(`posts_${userId}`, JSON.stringify(posts));
    }
  }, [posts, isAuthenticated, userId]);

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

        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setContent("");
        setImage(null);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  const handleAddComment = (postIndex, newComment) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      updatedPosts[postIndex].comments = updatedPosts[postIndex].comments || [];
      updatedPosts[postIndex].comments.push(newComment);
      return updatedPosts;
    });
  };

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
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.post_id !== postId)
        );
      } else {
        console.error("Failed to remove post:", response.data);
      }
    } catch (error) {
      console.error("Error removing post:", error);
    }
  };

  const handleEditPost = (postId) => {
    const post = posts.find((post) => post.post_id === postId);

    if (!post) {
      console.log("Post not found.");
      return;
    }

    setPostToEdit(post);
    setShowEditPostPopUp(true);
  };

  const handleSaveEditedPost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.post_id === updatedPost.post_id ? updatedPost : post
      )
    );
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
                  src={post.media_upload}
                  alt="Post Media"
                  onError={(e) => {
                    e.target.src = "/path/to/default-image.jpg";
                  }}
                />
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
                        e.target.value = "";
                      }
                    }}
                  />
                )}
              </CommentSection>
              {isPostOwner && (
                <RemoveEditButtonsContainer>
                  <RemovePostButton
                    onClick={() => handleRemovePost(post.post_id)}
                  >
                    Remove
                    <RemovePostIcon />
                  </RemovePostButton>
                  <EditPostButton onClick={() => handleEditPost(post.post_id)}>
                    Edit
                  </EditPostButton>
                </RemoveEditButtonsContainer>
              )}
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
