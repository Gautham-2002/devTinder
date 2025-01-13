const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      manLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        // this will only run when we create a new user

        // to check the validations while updating the user we need to add "runValidators: true" in the options
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid gender");
        }
      },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "No description yet",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true } // this adds createdAt and updatedAt fields for each document
);

const User = mongoose.model("User", userSchema); // always starts with a capital letter

module.exports = User;
