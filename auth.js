
const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const SECRET = "secretkey";

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User not found");

  const token = jwt.sign({ id: user._id }, SECRET);
  res.json({ user, token });
});

module.exports = router;
