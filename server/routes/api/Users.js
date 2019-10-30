const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const config = require("config");
const mongoose = require("mongoose");
const generateToken = require("../../middleware/generateToken");
const router = express.Router();
const { User, validate } = require("../../model/Users");
var otp = Math.floor(Math.random() * 1000 + 9999);

router.get("/all", async (req, res) => {
  const result = await User.find({});
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all users Successfully"
  });
});

module.exports = router;

router.post("/signup", async (req, res, next) => {
  try {
    // Validating if JOI constraints match
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let existing_user = await User.findOne({
      email: req.body.email
    });
    if (existing_user) return res.status(400).send("Email already exists");
    else {
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        isAdmin: req.body.isAdmin
      });
      user.password = await bcrypt.hash(user.password, 10);
      await user.save();
      res.status(200).json({
        status: 200,
        data: user,
        message: "Created One user Successfully"
      });
    }
  } catch (err) {
    next(err);
  }
});

// Login route for a user
router.post("/login", async (req, res, next) => {
  try {
    let username = await User.findOne({ email: req.body.email });
    if (!username) {
      return res.status(400).send({ message: "Account not found" });
    }
    if (!bcrypt.compareSync(req.body.password, username.password)) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    var payload = {
      _id: username._id,
      name: username.name,
      isAdmin: username.isAdmin
    };
    global.returned_token = generateToken(payload);
    res.send({
      message: "Logged in successfully",
      data: returned_token,
      isAdmin: payload.isAdmin
    });
  } catch (err) {
    next(err);
  }
});
