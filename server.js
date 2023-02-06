const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

const users = [
  {
    username: "ram",
    password: "12345",
  },
  {
    username: "vamsi",
    password: "12345",
  },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).send({ message: "Incorrect username or password" });
  }

  return res.send({ message: "Login successful" });
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
