const jwt = require("jsonwebtoken");
const { db } = require("../connect.js");

const JWT_SECRET = "blablabla";

const likePost = async (req, res) => {
  const { post_id } = req.params;
  console.log("Received request to like post with ID:", post_id);

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

    // Check if the user has already liked the post
    const checkLikeQuery = `
      SELECT * FROM public.likes
      WHERE post_id = $1 AND user_id = $2;
    `;
    const checkLikeValues = [post_id, userId];
    const likeResult = await client.query(checkLikeQuery, checkLikeValues);
    console.log("Like query result:", likeResult.rows);

    if (likeResult.rows.length > 0) {
      console.error("User has already liked this post.");
      return res
        .status(403)
        .json({ message: "User has already liked this post" });
    }

    // Proceed to insert a new like
    const likeQuery = `
      INSERT INTO public.likes (post_id, user_id, created_at)
      VALUES ($1, $2, NOW())
      RETURNING *;
    `;
    const likeValues = [post_id, userId];
    const likeInsertResult = await client.query(likeQuery, likeValues);
    console.log("Like insert result:", likeInsertResult.rows);

    if (likeInsertResult.rows.length > 0) {
      res.status(201).json({
        message: "Post liked successfully",
        like: likeInsertResult.rows[0],
      });
    } else {
      res.status(500).json({ message: "Error liking post" });
    }
  } catch (error) {
    console.error("Error during post like:", error);
    res.status(500).json({ message: "Error during post like", error });
  } finally {
    if (client) {
      await client.end();

      console.log("Database connection closed.");
    }
  }
};

module.exports = { likePost };
