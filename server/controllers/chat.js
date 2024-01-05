const db = require("../db/index.js");

const getChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.send("No User Exists!");
  }

  let chat = await db.ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  chat = await db.UserModel.populate(chat, {
    path: "latestMessage.sender",
    select: "name email _id",
  });

  if (chat.length > 0) {
    res.send(chat[0]);
  } else {
    const createChat = await db.ChatModel.create({
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    });

    const fullChat = await db.ChatModel.findOne({
      _id: createChat._id,
    }).populate("users", "-password");

    res.status(201).json(fullChat);
  }
};

const getChats = async (req, res) => {
  const chat = await db.ChatModel.find({
    users: { $elemMatch: { $eq: req.user.id } },
  })
  .populate("users", "-password")
  .populate("groupAdmin", "-password")
  .populate("latestMessage")
  .sort({ updatedAt: -1 });

  const user = await db.UserModel.populate(chat, {
    path: "latestMessage.sender",
    select: "name email _id",
  });

  res.status(201).json(user);
};

const createGroup = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user.id);
  
  const groupChat = await db.ChatModel.create({
    chatName: req.body.name,
    users: users,
    isGroupChat: true,
    groupAdmin: req.user.id,
  });

  const fullGroupChat = await db.ChatModel.findOne({ _id: groupChat._id })
  .populate("users", "-password")
  .populate("groupAdmin", "-password");

  res.status(200).json(fullGroupChat);
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updateChat = await db.ChatModel.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
  .populate("users", "-password")
  .populate("groupAdmin", "-password");

  if (!updateChat) {
    throw new BadRequestError("Chat Not Found");
  } else {
    res.json(updateChat);
  }
};

const addUserToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const addUser = await db.ChatModel.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
  .populate("users", "-password")
  .populate("groupAdmin", "-password");

  if (!addUser) {
    throw new BadRequestError("Chat Not Found");
  } else {
    res.status(201).json(addUser);
  }
};

const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const removeUser = await db.ChatModel.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
  .populate("users", "-password")
  .populate("groupAdmin", "-password");

  if (!removeUser) {
    throw new BadRequestError("Chat Not Found");
  } else {
    res.status(201).json(removeUser);
  }
};

module.exports = {
  getChat,
  getChats,
  createGroup,
  removeFromGroup,
  renameGroup,
  addUserToGroup,
};
