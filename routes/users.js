const auth = require("../middlewares/authmiddleware");
const config = require("config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcryptjs = require("bcryptjs");
const { User, validateUser } = require("../models/user");
const { Mail, validateMail } = require("../models/mail");
const express = require("express");
const router = express.Router();

//Getting users
router.get("/", auth, async (req, res) => {
  try {
    const regex = new RegExp(`.*${req.body.q}.*`, "i");
    const users = await User.find({ email: regex });
    res.status(200).send({ payload: users });
  } catch (ex) {
    res.status(200).send({ payload: "such user not exit" });
  }
});

//Register User
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(404).send({ payload: error.details[0].message });
    return;
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(404).send({ payload: "user already register" });
  }

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcryptjs.genSalt(10);
  user.password = await bcryptjs.hash(user.password, salt);

  await user.save();

  //Here use token to directly login not required email to login
  // const token = user.generateAuthToken();

  res
    // .header("x-auth-token", token)
    .status(200)
    .send({ payload: _.pick(user, ["_id", "name", "email"]) });
});

//update User

router.put("/:id", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      res.status(404).send({ payload: error.details[0].message });
      return;
    }
    const salt = await bcryptjs.genSalt(10);
    req.body.password = await bcryptjs.hash(req.body.password, salt);

    const user = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    if (user) return res.status(200).send({ payload: "succussfully updated" });
    throw new Error("such user not exist");
  } catch (e) {
    res.status(200).send({ payload: "such user not exist" });
  }
});

module.exports = router;
