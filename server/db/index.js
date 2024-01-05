const environment = require("../utils/constants");
const connectDB = require("../utils/mongodb/connect");
const validator = require("validator");
const mongoose = require("mongoose");
// MongoDB Connection Established
connectDB(environment.DB_URL);

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a Username"],
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Please Provide Email",
    },
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    minlength: 5,
    trim: true,
  },
});

const ChatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);
const ChatModel = mongoose.model("Chat", ChatSchema);
const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = { UserModel, ChatModel, MessageModel };
