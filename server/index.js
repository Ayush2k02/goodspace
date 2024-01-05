const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./routes/user");
const messageRoute = require("./routes/message.js");
const chatRoute = require("./routes/chat.js");
const authenticateUser = require("./middleware/auth.js");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/auth", userRouter);
app.use("/chat", authenticateUser, chatRoute);
app.use("/message", authenticateUser, messageRoute);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected " + socket.id);
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id + " connected");
    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    console.log(room + " joined");
    socket.join(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));

  socket.on("new-message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if (!chat.users) return console.log(`chat.users not defined`);

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      console.log("Hey got a message " + newMessageReceived);
      socket.in(user._id).emit("message-received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("Socket disconnected");
    socket.leave(userData._id);
  });
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
