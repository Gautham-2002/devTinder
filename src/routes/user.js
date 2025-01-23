const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoUrl about skills age gender";

userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // const connectionRequests = await ConnectionRequest.find({
    //   toUserId: loggedInUser._id,
    //   status: "interested",
    // }).populate("fromUserId"); // this will send everything from the user collection

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "about",
      "skills",
      "age",
      "gender",
    ]); // this will send only firstName and lastName from the user collection
    // ["firstName", "lastName"] or "firstName lastName" this is also valid

    res.json({
      message: "data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "about",
        "skills",
        "age",
        "gender",
      ])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "about",
        "skills",
        "age",
        "gender",
      ]);

    const data = connectionRequests.map((connectionRequest) => {
      if (connectionRequest.fromUserId.equals(loggedInUser._id)) {
        // connectionRequest.fromUserId.toString() == loggedInUser._id.toString()
        return connectionRequest.toUserId;
      } else {
        return connectionRequest.fromUserId;
      }
    });

    res.json({
      message: "data fetched successfully",
      data,
    });
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    if (limit > 50) {
      limit = 50;
    }
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    })
      .select("fromUserId toUserId")
      .populate("fromUserId", ["firstName", "lastName"])
      .populate("toUserId", ["firstName", "lastName"]); // this will get only firstName and lastName

    const hideUserFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId._id.toString());
      hideUserFromFeed.add(req.toUserId._id.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: [loggedInUser._id] } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({
      message: "data fetched successfully",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("something went wrong");
  }
});

module.exports = userRouter;
