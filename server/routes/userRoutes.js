const express = require("express");
const router = express.Router();
const userContr = require("../controllers/userController");
const { signup } = userContr;

// router.get("/", userContr.getHello);

router.post("/signup", userContr.signup);

router.post("/login/", userContr.login);

module.exports = router;
