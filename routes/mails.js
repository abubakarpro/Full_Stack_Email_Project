const { Mail, validateMail } = require("../models/mail");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authmiddleware");
const { User } = require("../models/user");
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

router.post("/composed", auth, async (req, res) => {
  const { error } = validateMail(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const token = req.header("x-auth-token");
  const decode = jwt.verify(token, config.get("jwtPrivateKey"));

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send({ payload: "email not exits" });
  }

  const mail = new Mail({
    senderId: decode._id,
    receiverId: user._id,
    subject: req.body.subject,
    body: req.body.body
  });
  await mail.save();
  return res.status(200).send({ payload: "mail sent" });
});

router.get("/allMails", auth, async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    console.log("id", decode._id);
    const allMails = await Mail.find({
      $or: [{ senderId: decode._id }, { receiverId: decode._id }]
    });

    console.log(allMails);

    if (!(allMails.length > 0 && Array.isArray(allMails))) {
      return res
        .status(404)
        .send({ payload: "Not Mails exists against such user" });
    }
    return res.status(200).send({ payload: allMails });
  } catch (ex) {
    return res
      .status(404)
      .send({ payload: "cat Not Mails exists against such user" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const singleMail = await Mail.findOneAndUpdate(
      { _id: req.params.id },
      { isread: true },
      { new: true }
    ).populate("receiverId", { name: 1 });

    return res.status(200).send({ payload: singleMail });
  } catch (ex) {
    return res
      .status(404)
      .send({ payload: "Not Mails exists against such user" });
  }
});

module.exports = router;
