// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.end("Hello World");
// });

// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

const express = require("express");

const app = express();

// app.use((req, res) => {
//   // request handler
//   // responds to all path requests from 3000
//   res.send("Hello World");
// });

// app.use("/", (req, res) => {
//   console.log("home page");
//   res.send("Home Page");
// });

app.use("/about", (req, res) => {
  console.log("about page");
  res.send("About Page");
});

app.use("/contact", (req, res) => {
  console.log("contact page");
  res.send("Contact Page");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
