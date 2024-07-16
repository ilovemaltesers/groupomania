const express = require("express");
const router = express.Router();
const commentContr = require("../controllers/commentController");

const verifyToken = require("../middleware/authMiddleware");

// router.post("/:post_id", verifyToken, commentContr.createComment);
// router.put("/:post_id", verifyToken, commentContr.editComment);
// router.delete("/:post_id", verifyToken, commentContr.deleteComment);
// router.get("/:post_id", verifyToken, commentContr.getComment);
