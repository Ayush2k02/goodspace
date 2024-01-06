const db = require("../db/index.js");

const sendMessage = async (req, res) => {
  const { message, chatId } = req.body;

  if (!message || !chatId) {
    console.log("Invalid data passed into request");

    return res
      .status(400)
      .json({ error: "Please Provide All Fields To send Message" });
  }

  var newMessage = {
    sender: req.user._id,
    message: message,
    chat: chatId,
  };
  try {
    let m = await db.MessageModel.create(newMessage);

    m = await m.populate("sender", "name");
    m = await m.populate("chat");
    m = await db.UserModel.populate(m, {
      path: "chat.users",
      select: "name email _id",
    });

    await db.ChatModel.findByIdAndUpdate(
      chatId,
      { latestMessage: m },
      { new: true }
    );

    res.status(200).json(m);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const allMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const getMessage = await db.MessageModel.find({ chat: chatId })
      .populate("sender", "name email _id")
      .populate("chat");

    res.status(200).json(getMessage);
  } catch (error) {
    res.status(400);
    json(error.message);
  }
};

module.exports = { allMessages, sendMessage };
