// const adminAuth = (req, res, next) => {
//   console.log("admin auth is getting checked");
//   const token = "token";
//   const isAuthorized = token === "token";
//   if (isAuthorized) {
//     next();
//   } else {
//     res.status(401).send("Unauthorized request");
//   }
// };

// const userAuth = (req, res, next) => {
//   console.log("admin auth is getting checked");
//   const token = "token";
//   const isAuthorized = token === "token";
//   if (isAuthorized) {
//     next();
//   } else {
//     res.status(401).send("Unauthorized request");
//   }
// };

// module.exports = {
//   adminAuth,
//   userAuth,
// };

// ----------------------------------------------------------------------------------------------------

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    // read the token from the req cookies
    const cookie = req.cookies;

    const { token } = cookie;

    if (!token) {
      return res.status(401).send("Please login first");
    }

    const decodedMessage = await jwt.verify(token, "devTinder@2707");

    const { _id } = decodedMessage;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("user not found");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = {
  userAuth,
};
