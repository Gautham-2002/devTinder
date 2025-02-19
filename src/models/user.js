const mongoose = require("mongoose");
var validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true, // this will be indexed by default
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender`,
      },
      // validate(value) {
      //   // this are called custom validators
      //   // this will only run when we create a new user

      //   // to check the validations while updating the user we need to add "runValidators: true" in the options
      //   if (!["male", "female", "other"].includes(value)) {
      //     throw new Error("Invalid gender");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL");
        }
      },
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

// schema methods
userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "devTinder@2707");

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;

  const passwordHash = user.password;

  const isMyPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isMyPasswordValid;
};

const User = new mongoose.model("User", userSchema); // always starts with a capital letter

module.exports = User;
