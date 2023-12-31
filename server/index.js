const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./routes/user");
import cors from "cors";
const corsOrigin = {
  origin: "http://localhost:3000", //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));
// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/user", userRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
