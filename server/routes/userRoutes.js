const express = require("express");
const router = express.Router();
const userContr = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");
const multer = require("../middleware/multer-config");

router.post("/signup", userContr.signup);

router.post("/login/", userContr.login);

router.post(
  "/upload-profile-picture",
  verifyToken,
  multer,
  userContr.uploadProfilePicture
);

router.get("/profile-picture", verifyToken, userContr.getProfilePicture);

module.exports = router;
