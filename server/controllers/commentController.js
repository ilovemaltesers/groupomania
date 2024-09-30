const jwt = require("jsonwebtoken");
const { db } = require("../connect.js");

const JWT_SECRET = "blablabla";

// Create Comment Function
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

  try {
    const createCommentQuery = `
      INSERT INTO public.comments (user_id, post_id, comment_text, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;

    const values = [userId, post_id, comment_text];
    const result = await db(createCommentQuery, values);
    console.log("Comment created successfully:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error while creating a comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Comment Function
const deleteComment = async (req, res) => {
  const { comment_id } = req.params;

  // Convert comment_id to an integer
  const parsedCommentId = parseInt(comment_id, 10);

  // Check if the conversion was successful
  if (isNaN(parsedCommentId)) {
    return res.status(400).json({ message: "Invalid comment ID" });
  }

  try {
    const deleteCommentQuery = `
      DELETE FROM public.comments
      WHERE comment_id = $1
      RETURNING *;
    `;

    const values = [parsedCommentId]; // Use the integer value
    const result = await db(deleteCommentQuery, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }

    console.log("Comment deleted successfully:", result.rows[0]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error while deleting a comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Comments Function
const getAllComments = async (req, res) => {
  try {
    const getAllCommentsQuery = `SELECT * FROM public.comments;`;
    const result = await db(getAllCommentsQuery);

    console.log("Comments retrieved successfully:", result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error while retrieving comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createComment, deleteComment, getAllComments };
