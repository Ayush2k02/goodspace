const express = require("express");
const { register, login, searchUser } = require("../controllers/user.js");
const router = express.Router();
const authenticateUser = require("../middleware/auth.js");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/users").get(authenticateUser,searchUser);

module.exports = router;
