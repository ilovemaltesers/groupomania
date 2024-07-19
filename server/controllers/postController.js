// for working with file and directory paths
const { create } = require("domain");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const { db } = require("../connect.js");
const { connect } = require("http2");
const { ImUser } = require("react-icons/im");

const JWT_SECRET = "blablabla";

const getAllPosts = async (req, res) => {
  let client;
  try {
    client = await db();
    console.log("Connected to the database.");

    // Get all posts from the database
    const posts = await client.query("SELECT * FROM public.posts");

    res.status(200).send(posts.rows);
  } catch (error) {
    console.error("Error during post retrieval:", error);
    res.status(500).send("Error during post retrieval");
  } finally {
    if (client) await client.end();
    console.log("Database connection closed.");
  }
};

const createPost = async (req, res) => {
  const { content } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "blablabla");

  const userId = decoded.id;

  console.log(content);

  console.log(userId);
  const mediaUpload = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null;
  console.log(mediaUpload);
  const client = await db();

  try {
    console.log("Connected to the database.");

    const query = `
      INSERT INTO public.posts (content, media_upload, user_id, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *;
    `;

    const values = [content, mediaUpload, userId];

    const result = await client.query(query, values);

    const newPost = result.rows[0];

    res
      .status(201)
      .json({ message: "Post successfully created", post: newPost });
  } catch (error) {
    console.error("Error during post creation:", error);
    res.status(500).json({ message: "Error during post creation", error });
  } finally {
    client.end();
    console.log("Database connection closed.");
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const { postId } = req.params;

  const client = await db();

  try {
    console.log("Connected to the database.");

    const query = `
      DELETE FROM public.posts
      WHERE post_id = $1
      RETURNING *;
    `;

    const values = [postId];

    const result = await client.query(query, values);
    const deletedPost = result.rows[0];

    res
      .status(200)
      .json({ message: "Post successfully deleted", post: deletedPost });
  } catch (error) {
    console.error("Error during post deletion:", error);
    res.status(500).json({ message: "Error during post deletion", error });
  } finally {
    // client.end();
    console.log("Database connection closed.");
  }
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
};
