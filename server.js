require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { userdata } = require("./db");
const jwt = require("jsonwebtoken");
const e = require("express");
app.use(cors());

app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  let token = "";
  const user = userdata.find(
    (u) => u.username === email && u.password === password
  );
  if (!user) {
    return res
      .status(401)
      .send({ message: "Incorrect username or password", success: false });
  } else {
    try {
      token = jwt.sign({ id: email }, process.env.KEY, { expiresIn: 60 });
    } catch (e) {
      console.log(e);
    }
  }
  return res.send({ message: "Login successful", success: true, token: token });
});

app.get("/buy", (req, res) => {
  const token = req.headers.auth;
  try {
    const decoded = jwt.verify(token, process.env.KEY);
    res.status(200).send({ success: true });
  } catch (e) {
    res.status(401).send({ success: false });
  }
});
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
