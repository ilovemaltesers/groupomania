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

  try {
    // Check if the user has already liked the post
    const checkLikeQuery = `
      SELECT * FROM public.likes
      WHERE post_id = $1 AND user_id = $2;
    `;
    const checkLikeValues = [post_id, userId];
    const likeResult = await db(checkLikeQuery, checkLikeValues);
    console.log("Like query result:", likeResult.rows);

    if (likeResult.rows.length > 0) {
      // User has already liked the post; proceed to unlike
      console.log("User has already liked this post. Proceeding to unlike.");

      // Remove the like
      const removeLikeQuery = `
        DELETE FROM public.likes
        WHERE post_id = $1 AND user_id = $2;
      `;
      const removeLikeValues = [post_id, userId];
      await db(removeLikeQuery, removeLikeValues);

      // Update the likes count in the posts table, ensuring it doesn't go below 0
      const updateLikesCountQuery = `
        UPDATE public.posts
        SET likes_count = GREATEST(likes_count - 1, 0)
        WHERE post_id = $1
        RETURNING likes_count;
      `;
      const updateLikesCountValues = [post_id];
      const updateLikesCountResult = await db(
        updateLikesCountQuery,
        updateLikesCountValues
      );
      console.log("Update likes count result:", updateLikesCountResult.rows);

      if (updateLikesCountResult.rows.length > 0) {
        res.status(200).json({
          message: "Post unliked successfully",
          likesCount: updateLikesCountResult.rows[0].likes_count,
        });
      } else {
        res.status(500).json({ message: "Error updating likes count" });
      }
    } else {
      // User has not liked the post yet; proceed to like
      console.log("User has not liked this post. Proceeding to like.");

      // Insert the new like
      const likeQuery = `
        INSERT INTO public.likes (post_id, user_id, created_at)
        VALUES ($1, $2, NOW())
        RETURNING *;
      `;
      const likeValues = [post_id, userId];
      const likeInsertResult = await db(likeQuery, likeValues);
      console.log("Like insert result:", likeInsertResult.rows);

      if (likeInsertResult.rows.length > 0) {
        // Update the likes count in the posts table
        const updateLikesCountQuery = `
          UPDATE public.posts
          SET likes_count = likes_count + 1
          WHERE post_id = $1
          RETURNING likes_count;
        `;
        const updateLikesCountValues = [post_id];
        const updateLikesCountResult = await db(
          updateLikesCountQuery,
          updateLikesCountValues
        );
        console.log("Update likes count result:", updateLikesCountResult.rows);

        if (updateLikesCountResult.rows.length > 0) {
          res.status(201).json({
            message: "Post liked successfully",
            likesCount: updateLikesCountResult.rows[0].likes_count,
          });
        } else {
          res.status(500).json({ message: "Error updating likes count" });
        }
      } else {
        res.status(500).json({ message: "Error liking post" });
      }
    }
  } catch (error) {
    console.error("Error during post like:", error);
    res.status(500).json({ message: "Error during post like", error });
  }
};

module.exports = { likePost };
