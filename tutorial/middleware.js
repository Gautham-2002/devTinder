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

// app.use(
//   "/user",
//   (req, res, next) => {
//     // Route handler 1
//     console.log("handling the route user");
//     next();
//   },
//   (req, res) => {
//     // Route handler 2
//     console.log("handling the route user 2");
//     res.send("2nd Response!!");
//   }
// );
// // here the output will be "2nd Response!!"
// // it will go to the next route handler

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

// app.use("/user", (req, res, next) => {
//   console.log("handling the route user");
//   next();
//   // these are called MIDDLEWARE
// });
// app.use("/user", (req, res) => {
//   // Route handler 2
//   console.log("handling the route user 2");
//   res.send("2nd Response!!");
// });
// // this is also acceptable and the output will be "2nd Response!!"
// // it will go to the next route handler

// // whenever we make an api call to the server, it will go through the chain of middlewares and then to the route handlers

// ----------------------------------------------------------------------------------------------------------------------------------------

// Handle auth middleware for all requests get, post, put, delete, ...
// app.use("/admin", (req, res, next) => {
//   console.log("admin auth is getting checked");
//   const token = "token";
//   const isAuthorized = token === "token";
//   if (isAuthorized) {
//     next();
//   } else {
//     res.status(401).send("Unauthorized request");
//   }
// });

// app.get("/admin/getAllData", (req, res) => {
//   res.send("All data");
// });

// app.get("/admin/deleteUser", (req, res) => {
//   res.send("User deleted");
// });

// // Middleware
// const { adminAuth, userAuth } = require("./middleware/auth");
// app.use("/admin", adminAuth);

// app.get("/admin/getAllData", (req, res) => {
//   res.send("All data");
// });

// app.get("/admin/deleteUser", (req, res) => {
//   res.send("User deleted");
// });

// app.get("/user", userAuth, (req, res) => {
//   res.send("user details");
// });

// --------------------------------------------------------------------------------------------------------------------------------------------------

// // Error Handlers
// app.get("/getUserData", (req, res) => {
//   try {
//     throw new Error("error");
//     res.send("user details");
//   } catch (err) {
//     res.status(500).send("something went wrong");
//   }
// });

// -------------------------------------------------------------------------

// app.get("/getUserData", (req, res) => {
//   throw new Error("error");
//   res.send("user details");
// });

// app.get("/", (err, req, res, next) => {
//   // wild card error handler
//   // this should be the last route handler, as we know the order of the route handlers is important
//   if (err) {
//     res.status(500).send("something went wrong");
//   }
// });
// // if 2 params are there then they are req, res
// // if 3 params are there then they are req, res, next
// // if 4 params are there then they are err, req, res, next

// --------------------------------------------------------------------------------------------------------------------------------------------------

// All in all, app.all and app.use can be used to achieve similar results: app.all('*') and app.use('/') achieve the same thing!

// The devil is in the details: where app.use('/api') will match both the route /app as well as any routes that extend /app, app.all('/api/*') will ONLY match routes that extend /api (i.e /api/resource, and NOT /api alone).

// I wound up using app.use('/api', ...) to attach my authentication middleware to my app, so in my app.js config file I needed to make sure that it was positioned above the routers to ensure it would be run before any other callbacks associated with my api routes.
