const jwt = require("jsonwebtoken");
const { db } = require("../connect.js");

const JWT_SECRET = "blablabla";

const createComment = async (req, res) => {
  const { post_id } = req.params;

  // Check if comment_text is sent in the request body
  const { comment_text } = req.body;
  if (!comment_text || comment_text.trim() === "") {
    return res
      .status(400)
      .json({ message: "Comment text is missing or empty" });
  }

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
    console.log("Successfully connected to PostgreSQL database");

    const createCommentQuery = `
      INSERT INTO public.comments (user_id, post_id, comment_text, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;

    const values = [userId, post_id, comment_text];
    const result = await client.query(createCommentQuery, values);
    console.log("Comment created successfully:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error while creating a comment:", error); // Check this log for errors
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      await client.end();
      console.log("Database connection closed.");
    }
  }
};

module.exports = { createComment };
