const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { isUserDetailsValid } = require("../utils/mongodb/userCheck");
const environment = require("../utils/constants");

// User Routes
router.post("/signup", async (req, res) => {
  const userInfo = req.body;
  if (!userInfo.username || !userInfo.password || !userInfo.email)
    return res.status(404).send("Please provide proper credentials");

  try {
    await User.create(userInfo);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log({ error });
  }
});

router.post("/signin", async (req, res) => {
  const userInfo = req.body;
  if (!userInfo.username || !userInfo.password)
    return res.status(404).send("Please provide proper credentials");

  try {
    const isDetailsValid = await isUserDetailsValid(userInfo);
    if (isDetailsValid) {
      const token = jwt.sign(
        { username: userInfo.username },
        environment.JWT_SECRET
      );
      res.json({ token });
    } else {
      res.status(403).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.log({ error });
  }
});

module.exports = router;
