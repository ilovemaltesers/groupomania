const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware"); // Importing the auth middleware

const multer = require("../middleware/multer-config");
const postController = require("../controllers/postController");

router.post("/", verifyToken, multer, postController.createPost);

router.get("/", verifyToken, postController.getAllPosts);

router.delete("/:post_id", verifyToken, multer, postController.deletePost);

router.put("/:post_id", verifyToken, multer, postController.updatePost);

module.exports = router;
