// for working with file and directory paths
const { create } = require("domain");
const fs = require("fs");
const path = require("path");

const { db } = require("../connect.js");

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
  const { title, content } = req.body;
  const imageUrl = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null;

  let client;
  try {
    client = await db();
    console.log("Connected to the database.");

    // Insert post into the database
    await client.query(
      "INSERT INTO public.posts (title, content, image_url) VALUES ($1, $2, $3)",
      [title, content, imageUrl]
    );

    res.status(201).send("Post successfully created");
  } catch (error) {
    console.error("Error during post creation:", error);
    res.status(500).send("Error during post creation");
  } finally {
    if (client) await client.end();
    console.log("Database connection closed.");
  }
};

module.exports = {
  getAllPosts,
  createPost,
};
