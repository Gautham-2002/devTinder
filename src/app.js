const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const cors = require("cors"); // to bypass cors issues while developing locally

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // whitelisting the origin
    credentials: true,
  })
);
app.use(express.json()); // This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(cookieParser()); // this middleware is used to parse cookies and access them in the request object

app.use("/", authRouter); // these are routers, to the express we can pass routers, middlewares and request handlers
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("database connected");

    // proper way is to connect to the database first and then start the server

    app.listen(3000, () => {
      console.log("server running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
