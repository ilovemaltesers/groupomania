const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const multer = require("../middleware/multer-config");

const postContr = require("../controllers/postController");

router.post("/", auth, multer, postContr.createPost);
router.get("/", auth, postContr.getAllPosts);
