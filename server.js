const http = require("http");
const express = require("express");
const app = express();

app.get("/msg", (req, res) => {
  res.send("Hello World");
});

const server = http.createServer(app);
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
