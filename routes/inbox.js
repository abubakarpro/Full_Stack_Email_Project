const { Mail, validateMail } = require("../models/mail");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authmiddleware");
const config = require("config");
const jwt = require("jsonwebtoken");

router.get("/", auth, async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));

    const receivedMails = await Mail.find({
      receiverId: decode._id
    }).populate("senderId", { name: 1 });

    // console.log(receivedMails.shortDesc);

    if (!(receivedMails.length > 0 && Array.isArray(receivedMails))) {
      return res
        .status(404)
        .send({ payload: "Not Mails exists against such user" });
    }
    return res.status(200).send({ payload: receivedMails });
  } catch (ex) {
    return res
      .status(404)
      .send({ payload: " Not Mails exists against such user" });
  }
});

router.get("/unread", auth, async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    const unreadMails = await Mail.find({
      receiverId: decode._id,
      isread: req.body.isread
    });
    if (!(unreadMails.length > 0 && Array.isArray(unreadMails))) {
      return res
        .status(404)
        .send({ payload: "Not Mails exists against such user" });
    }
    return res.status(200).send({ payload: unreadMails });
  } catch (ex) {
    return res
      .status(404)
      .send({ payload: "Not Mails exists against such user" });
  }
});

module.exports = router;
