const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "invalid status",
      });
    }

    //   if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    //     throw new Error("fromUserId and toUserId cannot be same");
    //   }

    // check if there is an existing connexctionrequest
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingConnectionRequest) {
      return res.status(400).json({
        message: "request already sent",
      });
    }

    // check if the toUserId exists in the database
    const toUserExists = await User.findById(toUserId);
    if (!toUserExists) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: "request sent successfully",
      data,
    });
  } catch (err) {
    res.status(400).send("user not saved");
  }
});

router.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["rejected", "accepted"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "status not allowed",
        });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res.status(400).json({
          message: "request not found",
        });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({
        message: "request updated successfully",
        data,
      });
    } catch (err) {
      res.send(400).send("something went wrong");
    }
  }
);

module.exports = router;
