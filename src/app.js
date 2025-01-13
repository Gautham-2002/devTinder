const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validareSignUpData } = require("./utils/validatons");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json()); //This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

app.post("/signup", async (req, res) => {
  // console.log(req.body); // will be undefined if json middleware is not used

  try {
    // first step is validation of data
    validareSignUpData(req);

    // second step is encrpting password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    }); // creating a new instance of the User model
    // if we send any data which is not part of schema it will be ignored
    await user.save();
    res.send("user saved successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("user not saved");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("user not found, email not found"); // this is not right wat=y, never expose such details in the response errors, just "invalid credentials" would be enough
    }
    const isMyPasswordValid = await bcrypt.compare(password, user.password);
    if (isMyPasswordValid) {
      res.send("user logged in");
    } else {
      res.status(400).send("user not logged in");
    }
  } catch (err) {
    res.status(400).send("user not saved");
  }
});

// get user by email
app.get("/users", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length == 0) {
      res.status(400).send("user not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("user not found");
  }
});

// Feed api - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    if (user.length == 0) {
      res.status(400).send("no users found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("user not found");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted");
  } catch (err) {
    res.status(400).send("user not found");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const allowedUpdates = ["photoUrl", "about", "gender", "skills", "age"];
    const isUpdateAllowed = Object.keys(data).every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data?.skills.length > 5) {
      throw new Error("skills cannot be more than 5");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    console.log("user", user);
    res.send("user updated");
  } catch (err) {
    res.status(400).send("user not found");
  }
});

// never trust request body data, always sanitize it first and validate it and then use it or update it in the database

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
