// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.end("Hello World");
// });

// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

const express = require("express");

const app = express();

// -----------------------------------------------------------------------------------------------------------------------------

// The order of the hanlders is important

// app.use((req, res) => {
//   // request handler
//   // responds to all path requests from 3000
//   res.send("Hello World");
// });

// app.use("/about", (req, res) => {
//   // not only '/about' path, anything that starts with '/about' will be responded with this handler ex: '/about/about'
//   console.log("about page");
//   res.send("About Page");
// });

// app.use("/contact", (req, res) => {
//   console.log("contact page");
//   res.send("Contact Page");
// });

// app.use("/", (req, res) => {
//   // wildcard handler
//   // not only '/' path, anything that starts with '/' will be responded with this handler ex: '/about'
//   console.log("home page");
//   res.send("Home Page");
// });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// use method responds to all the HTTP method api requests. Ex: GET, POST, PUT, DELETE
// for example app.use("/", (req, res) => {}) will respond to all the HTTP method api requests.

//-----------------------------------------------------------------------------------------------------------------------------

// Instead of using app.use() we can use app.get(), app.post(), app.put(), app.delete()

app.get("/user", (req, res) => {
  console.log("home page");
  res.send("Home Page");
});

app.post("/user", (req, res) => {
  console.log("added user to database");
  res.send("added user to database");
});

app.delete("/user", (req, res) => {
  console.log("deleted user from database");
  res.send("deleted user from database");
});

// url/search params, ex: http://localhost:3000/user/1
app.get("/user/:id", (req, res) => {
  console.log(req.params);
  res.send("user details");
});

// query params, ex: http://localhost:3000/user?id=1
app.get("/user", (req, res) => {
  console.log(req.query);
  res.send("user details");
});

// ex: ? means optional, use?r matches usr, user
app.get("/use?r", (req, res) => {
  res.send("user details");
});

// ex: + means one or more, ab+c matches abc, abbc
app.get("/ab+c", (req, res) => {
  res.send("user details");
});

// similarly those can be grouped like a(bc)?d matches ad, abcd

// // * means anything ex: az, abz, abcz
// app.get("a*z", (req, res) => {
//   res.send("user details");
// });

// // regex can be used
// app.get(/.*fly$/, (req, res) => {
//   res.send("user details");
// });
