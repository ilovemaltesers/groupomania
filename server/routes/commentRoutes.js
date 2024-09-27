const express = require("express");
const router = express.Router();
const commentContr = require("../controllers/commentController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/:post_id", verifyToken, commentContr.createComment);

router.delete("/:comment_id", verifyToken, commentContr.deleteComment);

router.get("/", verifyToken, commentContr.getAllComments);

// router.put("/:post_id", verifyToken, commentContr.editComment);

// router.get("/:post_id", verifyToken, commentContr.getAllComments);

module.exports = router;
