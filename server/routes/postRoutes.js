const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware"); // Importing the auth middleware

const multer = require("../middleware/multer-config");
const postController = require("../controllers/postController");

// Example route: Create a new post
router.post("/", verifyToken, multer, postController.createPost);

// Example route: Get all posts
router.get("/", verifyToken, postController.getAllPosts);

module.exports = router;
