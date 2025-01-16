const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validatons");
const validator = require("validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("user not saved");
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("invalid data");
    }

    const user = req.user;

    Object.keys(req.body).forEach((key) => [(user[key] = req.body[key])]);

    await user.save();

    // res.send("Profile updated successfully");
    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(400).send("user not saved");
  }
});

// reset password route
router.post("/profile/password", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);

    if (!user) {
      throw new Error("user not found");
    }

    if (!validator.isStrongPassword(req.body.password)) {
      throw new Error("password is not strong enough");
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    user.password = passwordHash;

    await user.save();

    res.send("Password updated successfully");
  } catch (err) {
    res.status(400).send("user not saved");
  }
});

module.exports = router;
