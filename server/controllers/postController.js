const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { db } = require("../connect.js");

const JWT_SECRET = "blablabla";

// Get all posts
const getAllPosts = async (req, res) => {
  let client;
  try {
    client = await db();
    console.log("Connected to the database.");

    const query = `
      SELECT p.post_id, p.content, p.media_upload, p.created_at, p.updated_at, 
             u._id AS user_id, u.given_name, u.family_name, u.email, u.profile_picture
      FROM public.posts p
      JOIN public.users u ON p.user_id = u._id;
    `;

    const result = await client.query(query);
    console.log("Retrieved posts with user info:", result.rows);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error during post retrieval:", error);
    res.status(500).json({ message: "Error during post retrieval" });
  } finally {
    if (client) {
      await client.end();
      console.log("Database connection closed.");
    }
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
    console.log("Decoded Token:", decoded);
    userId = decoded.userId;
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  if (!userId) {
    console.error("User ID is null or undefined after token decoding.");
    return res.status(400).json({ message: "User ID could not be determined" });
  }

  console.log("Content:", content);
  console.log("User ID:", userId);

  const mediaUpload = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null;

  console.log("Media Upload URL:", mediaUpload);

  let client;
  try {
    client = await db();
    console.log("Successfully connected to PostgreSQL database.");

    const query = `
      INSERT INTO public.posts (content, media_upload, user_id, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *;
    `;

    const values = [content, mediaUpload, userId];
    console.log("Executing Query:", query);
    console.log("Query Values:", values);

    const result = await client.query(query, values);
    console.log("Query Result:", result.rows[0]);

    const newPost = result.rows[0];
    res
      .status(201)
      .json({ message: "Post successfully created", post: newPost });
  } catch (error) {
    console.error("Error during post creation:", error);
    res.status(500).json({ message: "Error during post creation", error });
  } finally {
    if (client) {
      await client.end();
      console.log("Database connection closed.");
    }
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const { post_id } = req.params;
  console.log("Received request to delete post with ID:", post_id);

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.error("Authorization token is missing.");
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  let userId;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    userId = decoded.userId;
    console.log("Decoded user ID from token:", userId);
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  let client;
  try {
    client = await db();
    console.log("Connected to the database.");

    // Find the post to ensure it exists and user has permission to delete it
    const findPostQuery = `
      SELECT * FROM public.posts
      WHERE post_id = $1 AND user_id = $2;
    `;
    const findPostValues = [post_id, userId];
    const postResult = await client.query(findPostQuery, findPostValues);
    console.log("Post query result:", postResult.rows);

    if (postResult.rows.length === 0) {
      console.error(
        "Post not found or user does not have permission to delete it."
      );
      return res.status(403).json({
        message:
          "You do not have permission to delete this post or post not found",
      });
    }

    const post = postResult.rows[0];

    if (post.media_upload) {
      // Extract filename from media_upload URL
      try {
        const url = new URL(post.media_upload);
        const fileName = path.basename(url.pathname); // Extract the filename from URL path
        const imagePath = path.join(__dirname, "..", "images", fileName); // Adjust path if images are stored elsewhere

        console.log("Image path for deletion:", imagePath);

        // Check if file exists
        fs.access(imagePath, fs.constants.F_OK, (err) => {
          if (err) {
            console.error(
              "Image file does not exist, skipping deletion:",
              imagePath
            );
          } else {
            // Delete the file
            fs.unlink(imagePath, (unlinkErr) => {
              if (unlinkErr) {
                console.error("Error deleting the image:", unlinkErr);
              } else {
                console.log("Image deleted successfully:", imagePath);
              }
            });
          }
        });
      } catch (error) {
        console.error("Error processing media_upload URL:", error);
      }
    }

    // Proceed to delete the post from the database
    const deleteQuery = `
      DELETE FROM public.posts
      WHERE post_id = $1
      RETURNING *;
    `;
    const deleteValues = [post_id];
    const deleteResult = await client.query(deleteQuery, deleteValues);
    console.log("Delete query result:", deleteResult.rows);

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
  } finally {
    if (client) {
      await client.end();
      console.log("Database connection closed.");
    }
  }
};

const updatePost = async (req, res) => {
  // Extract post ID from URL parameters
  const { post_id } = req.params;

  // Extract content from request body and file information from multer
  const { content } = req.body;
  const file = req.file;

  // Build the media upload URL if a file is provided, otherwise set to null
  let newMediaUpload = file
    ? `${req.protocol}://${req.get("host")}/images/${file.filename}`
    : null;

  let client;

  try {
    // Connect to the database
    client = await db();
    console.log("Connected to the database.");

    // Log the request details for debugging
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    // Fetch the existing post data before the update
    const preUpdateQuery = `SELECT * FROM public.posts WHERE post_id = $1;`;
    const preUpdateResult = await client.query(preUpdateQuery, [post_id]);
    console.log("Post Before Update:", preUpdateResult.rows);

    // Ensure that there is a post with the given post_id
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

    console.log("Executing Update Query:", updateQuery);
    console.log("Update Query Values:", updateValues);

    const updateResult = await client.query(updateQuery, updateValues);
    console.log("Update Query Result:", updateResult.rows);

    // Fetch the post data again after the update to confirm changes
    const postUpdateResult = await client.query(preUpdateQuery, [post_id]);
    console.log("Post After Update:", postUpdateResult.rows);

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
  } finally {
    // Ensure the database connection is closed
    if (client) {
      await client.end();
      console.log("Database connection closed.");
    }
  }
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
  // updatePost, // Uncomment this line if updatePost is needed
};
