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

router.post("/profile/role/aboutme", verifyToken, userContr.postRoleAboutMe);

router.get("/profile/role/aboutme", verifyToken, userContr.getRoleAboutMe);

router.delete("/profile/delete/account", verifyToken, userContr.deleteAccount);

router.post("/profile/change-password", verifyToken, userContr.changePassword);

module.exports = router;
