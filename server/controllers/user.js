const db = require("../db/index.js");
const jwt = require("jsonwebtoken");
const environment = require("../utils/constants");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(404).json({ error: "Enter all the values" });
  }

  const isUserExists = await db.UserModel.findOne({ email: email });

  if (isUserExists) {
    return res
      .status(404)
      .json({ error: "db with this email already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await db.UserModel.create({
    name,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    environment.JWT_SECRET,
    {
      expiresIn: environment.JWT_LIFETIME,
    }
  );

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please Provide All the Values" });
  }

  const isUser = await db.UserModel.findOne({ email: email });

  if (!isUser) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const comparePassword = await bcrypt.compare(password, isUser.password);

  if (!comparePassword) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: isUser._id,
    },
    environment.JWT_SECRET,
    {
      expiresIn: environment.JWT_LIFETIME,
    }
  );

  res.status(200).json({
    success: true,
    _id: isUser._id,
    name: isUser.name,
    email: isUser.email,
    token,
  });
};

const searchUser = async (req, res) => {
  const { search } = req.query;

  const user = await db.UserModel.find({
    name: { $regex: new RegExp(search, "i") },
  }).select("name _id email");
  // console.log(user.forEach((ele) => console.log(ele)));
  res.status(200).json(user);
};

module.exports = { register, login, searchUser };
