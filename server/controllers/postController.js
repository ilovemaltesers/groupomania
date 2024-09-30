const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { db } = require("../connect.js");

const JWT_SECRET = "blablabla";

// Fetch all posts with associated data (user, comments, likes)
const getAllPosts = async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch all posts with associated user info
    const postsResult = await db(
      `
      SELECT 
        posts.post_id, 
        posts.content,
        posts.media_upload,
        posts.created_at,
        users.given_name,
        users.family_name,
        users.profile_picture,
        COUNT(likes.post_id) AS likes_count,
        MAX(CASE WHEN likes.user_id = $1 THEN 1 ELSE 0 END) AS is_liked
      FROM 
        posts
      JOIN 
        users ON posts.user_id = users._id
      LEFT JOIN 
        likes ON likes.post_id = posts.post_id
      GROUP BY 
        posts.post_id, users._id
      ORDER BY 
        posts.created_at DESC;
    `,
      [userId]
    );

    // Access the rows from the posts result
    const posts = postsResult.rows;

    // Fetch comments for all posts
    const commentsResult = await db(`
      SELECT 
        comments.comment_id,
        comments.post_id,
        comments.comment_text,
        comments.created_at,
        users.given_name,
        users.family_name,
        users.profile_picture
      FROM 
        comments
      JOIN 
        users ON comments.user_id = users._id;
    `);

    // Access the comments rows
    const commentsData = commentsResult.rows;

    // Group comments by post_id for easy lookup
    const commentsByPostId = commentsData.reduce((acc, comment) => {
      if (!acc[comment.post_id]) {
        acc[comment.post_id] = [];
      }
      acc[comment.post_id].push(comment);
      return acc;
    }, {});

    // Combine posts with their respective comments
    const postsWithComments = posts.map((post) => ({
      ...post,
      comments: commentsByPostId[post.post_id] || [],
    }));

    // Return the combined data
    res.json(postsWithComments);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new post
const createPost = async (req, res) => {
  const { content } = req.body;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.error("Authorization token is missing.");
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  let userId;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    userId = decoded.userId;
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  if (!userId) {
    console.error("User ID is null or undefined after token decoding.");
    return res.status(400).json({ message: "User ID could not be determined" });
  }

  const mediaUpload = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null;

  try {
    const query = `
      INSERT INTO public.posts (content, media_upload, user_id, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *;
    `;

    const values = [content, mediaUpload, userId];
    const result = await db(query, values); // Use db function
    const newPost = result.rows[0];

    res
      .status(201)
      .json({ message: "Post successfully created", post: newPost });
  } catch (error) {
    console.error("Error during post creation:", error);
    res.status(500).json({ message: "Error during post creation", error });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const { post_id } = req.params;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.error("Authorization token is missing.");
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  let userId;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    userId = decoded.userId;
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  try {
    // Find the post to ensure it exists and user has permission to delete it
    const findPostQuery = `
      SELECT * FROM public.posts
      WHERE post_id = $1 AND user_id = $2;
    `;
    const findPostValues = [post_id, userId];
    const postResult = await db(findPostQuery, findPostValues);

    if (postResult.rows.length === 0) {
      return res.status(403).json({
        message:
          "You do not have permission to delete this post or post not found",
      });
    }

    const post = postResult.rows[0];

    if (post.media_upload) {
      // Delete the media upload file
      const url = new URL(post.media_upload);
      const fileName = path.basename(url.pathname);
      const imagePath = path.join(__dirname, "..", "images", fileName);

      fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink(imagePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting the image:", unlinkErr);
            } else {
              console.log("Image deleted successfully:", imagePath);
            }
          });
        }
      });
    }

    // Proceed to delete the post from the database
    const deleteQuery = `
      DELETE FROM public.posts
      WHERE post_id = $1
      RETURNING *;
    `;
    const deleteValues = [post_id];
    const deleteResult = await db(deleteQuery, deleteValues);

    if (deleteResult.rows.length > 0) {
      res.status(200).json({
        message: "Post successfully deleted",
        post: deleteResult.rows[0],
      });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error during post deletion:", error);
    res.status(500).json({ message: "Error during post deletion", error });
  }
};

// Update a post
const updatePost = async (req, res) => {
  const { post_id } = req.params;
  const { content } = req.body;
  const file = req.file;

  let newMediaUpload = file
    ? `${req.protocol}://${req.get("host")}/images/${file.filename}`
    : null;

  try {
    // Fetch the existing post data before the update
    const preUpdateQuery = `SELECT * FROM public.posts WHERE post_id = $1;`;
    const preUpdateResult = await db(preUpdateQuery, [post_id]);

    if (preUpdateResult.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Perform the update operation
    const updateQuery = `
      UPDATE public.posts
      SET content = $1, media_upload = $2, updated_at = NOW()
      WHERE post_id = $3
      RETURNING *;
    `;
    const updateValues = [content || null, newMediaUpload, post_id];

    const updateResult = await db(updateQuery, updateValues);

    if (updateResult.rows.length > 0) {
      res.status(200).json({
        message: "Post successfully updated",
        post: updateResult.rows[0],
      });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error during post update:", error);
    res.status(500).json({ message: "Error during post update", error });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
};
