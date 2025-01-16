const express = require("express");
const { userAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("user not saved");
  }
});

module.exports = router;
