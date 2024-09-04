const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const likeController = require("../controllers/likeController");

router.post("/:post_id/like", verifyToken, likeController.likePost);

module.exports = router;
cd;
