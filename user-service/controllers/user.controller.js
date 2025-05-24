const users = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ username, password });
  res.status(201).json({ message: "User registered" });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

exports.logout = (req, res) => {
  res.json({ message: "Logged out (token discarded on client side)" });
};

exports.profile = (req, res) => {
  res.json({ user: req.user });
};
