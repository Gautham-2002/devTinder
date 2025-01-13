const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("server running on port 3000");
});

// app.use(
//   "/user",
//   (req, res) => {
//     // Route handler 1
//     console.log("handling the route user");
//     res.send("Response!!");
//   },
//   (req, res) => {
//     // Route handler 2
//     console.log("handling the route user 2");
//     res.send("2nd Response!!");
//   }
// );
// // the output for this will be "Response!!"
// // it will not go to the next route handler

// app.use(
//   "/user",
//   (req, res) => {
//     // Route handler 1
//     console.log("handling the route user");
//   },
//   (req, res) => {
//     // Route handler 2
//     console.log("handling the route user 2");
//     res.send("2nd Response!!");
//   }
// );
// // here there will be no output
// // it will not go to the next route handler

app.use(
  "/user",
  (req, res, next) => {
    // Route handler 1
    console.log("handling the route user");
    next();
  },
  (req, res) => {
    // Route handler 2
    console.log("handling the route user 2");
    res.send("2nd Response!!");
  }
);
// here the output will be "2nd Response!!"
// it will go to the next route handler

// app.use(
//   "/user",
//   (req, res, next) => {
//     // Route handler 1
//     console.log("handling the route user");
//     res.send("Response!!");
//     next();
//   },
//   (req, res) => {
//     // Route handler 2
//     console.log("handling the route user 2");
//     res.send("2nd Response!!");
//   }
// );
// // here the output will be "Response!!" but it also throws an error in server
// // it will go to the next route handler and execute but it cannot send a response as the first route handler already sent a response

// similarly we can add multiple route handlers to the app.use() function

// it also accepts array of route handlers
// app.use("/user", [
//   () => console.log("handler 1"),
//   () => console.log("handler 2"),
// ]);
