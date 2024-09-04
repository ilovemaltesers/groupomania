const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const likeController = require("../controllers/likesController");

router.post("/:post_id", verifyToken, likeController.likePost);

module.exports = router;
