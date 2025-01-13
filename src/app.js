const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json()); //This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

app.post("/signup", async (req, res) => {
  // console.log(req.body); // will be undefined if json middleware is not used

  const user = new User(req.body); // creating a new instance of the User model

  try {
    await user.save();
    res.send("user saved successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("user not saved");
  }
});

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
