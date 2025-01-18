const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // this is a reference to the User model, it is like a connection between the two models/collections
      required: true,
      //   index: true, //this field is necessary for indexing
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is not a valid status`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// by indexing fields, we can make queries faster

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }); // this is a compound index, this will make the queries which have both fromUserId and toUserId faster

// indexing shouldn't be done for all fields unnecessarily, it comes at the cost of performance

connectionRequestSchema.pre("save", function (next) {
  // this is a middleware
  // this will be called before saving the document
  // this is used for validating the data before saving the document

  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("fromUserId and toUserId cannot be same");
  }
  next();
});

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;
