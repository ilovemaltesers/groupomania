const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware"); // Importing the auth middleware

const multer = require("../middleware/multer-config");
const postController = require("../controllers/postController");

router.post("/", verifyToken, multer, postController.createPost);

router.get("/", verifyToken, postController.getAllPosts);

router.delete("/:post_id", verifyToken, postController.deletePost);

router.put("/:post_id", verifyToken, multer, postController.updatePost);

// router.post("/:post_id/like", verifyToken, postController.likePost);

module.exports = router;
