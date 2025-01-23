const express = require("express");
const { validateSignUpData } = require("../utils/validatons");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup", async (req, res) => {
  // console.log(req.body); // will be undefined if json middleware is not used. Json middleware adds the body property to the request object

  try {
    // first step is validation of data
    validateSignUpData(req);

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
    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    // res.send("user saved successfully");
    res.json({
      message: "user saved successfully",
      user: savedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("user not saved");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("user not found, email not found"); // this is not right way, never expose such details in the response errors, just "invalid credentials" would be enough
    }
    // const isMyPasswordValid = await bcrypt.compare(password, user.password);
    const isMyPasswordValid = await user.validatePassword(password);
    if (isMyPasswordValid) {
      // create a JWT token

      // const token = await jwt.sign({ _id: user._id }, "devTinder@2707", {
      //   expiresIn: "7d",
      // });
      // const token = await jwt.sign({ _id: user._id }, "devTinder@2707");

      const token = await user.getJWT();

      // Add token to the cookie send the response back to the client
      // res.cookie("token", token);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      res.json({
        message: "user logged in",
        user,
      });
    } else {
      res.status(400).send("user not logged in");
    }
  } catch (err) {
    res.status(400).send("user not saved");
  }
});

router.post("/logout", async (req, res) => {
  // Do any cleanup work here

  //   res.cookie("token", null, {
  //     expires: new Date(Date.now()),
  //   });
  //   res.send("user logged out");

  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("user logged out"); // we can chain the methods
});

module.exports = router;
