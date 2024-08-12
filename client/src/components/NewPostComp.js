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
} from "../styles/stylesFeedPage";

const NewPost = () => {
  // Extract authentication details from context
  const { isAuthenticated, auth } = useAuth();

  // State hooks for post content, image, and list of posts
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  // Fetch posts from the server
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/post", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Update posts state
      setPosts(response.data);
      // Optionally, store posts in local storage
      localStorage.setItem("posts", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Initial fetch and set up polling
  useEffect(() => {
    // Retrieve posts from local storage if available
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    if (savedPosts.length > 0) {
      setPosts(savedPosts);
    } else {
      fetchPosts(); // Initial fetch if no saved posts
    }

    // Set up polling every 5 seconds
    const intervalId = setInterval(fetchPosts, 1000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Update local storage whenever the posts state changes
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Handler for changes in the post content textarea
  const handleCommentChange = (event) => {
    setContent(event.target.value);
  };

  // Handler for uploading an image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Set image state to the selected file
    }
  };

  // Function to submit a new post
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
          image: response.data.post.media_upload,
          userId: auth.userId,
          id: response.data.post.post_id,
          comments: [],
        };
        setPosts([newPost, ...posts]); // Add new post at the beginning of the array
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  // Function to add a comment to a post
  const handleAddComment = (postIndex, newComment) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex].comments.push(newComment);
    setPosts(updatedPosts);
  };

  // Function to remove a post
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

  // Function to initiate editing a post (placeholder)
  const handleEditPost = (postIndex) => {
    console.log(`Editing post ${postIndex}`);
  };

  return (
    <FeedMainContainer>
      {/* Section for creating a new post */}
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
              src={URL.createObjectURL(image)} // Display the selected image before upload
              alt="Uploaded"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          </div>
        )}
      </NewPostBody>
      {/* Display the list of posts */}
      {posts
        .slice()
        .reverse()
        .map((post, index) => (
          <PostCard key={`${post.id}-${index}`}>
            {post.content && <p>{post.content}</p>}
            {post.media_upload && (
              <StyledImage
                src={post.media_upload}
                alt="Post"
                style={{ maxWidth: "100%" }}
              />
            )}
            <CommentSection>
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
              {/* Render comments */}
              {post.comments &&
                post.comments.map((comment, commentIndex) => (
                  <p key={`${comment.id}-${commentIndex}`}>{comment.text}</p>
                ))}
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
