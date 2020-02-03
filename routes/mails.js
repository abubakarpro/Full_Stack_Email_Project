const { Mail, validateMail } = require("../models/mail");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authmiddleware");
const config = require("config");
const jwt = require("jsonwebtoken");

router.post("/composed", auth, async (req, res) => {
  const { error } = validateMail(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const token = req.header("x-auth-token");
  const decode = jwt.verify(token, config.get("jwtPrivateKey"));

  const mail = new Mail({
    senderId: decode._id,
    receiverId: req.body.receiverId,
    subject: req.body.subject,
    body: req.body.body
  });
  await mail.save();
  return res.status(200).send({ payload: "mail sent" });
});

router.get("/inbox", auth, async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    const receivedMails = await Mail.find({ receiverId: decode._id });
    console.log(receivedMails);
    if (!(receivedMails.length > 0 && receivedMails.isArray()))
      return res
        .status(404)
        .send({ payload: "Not Mails exists against such user" });
    return res.status(200).send({ payload: receivedMails });
  } catch (ex) {
    return res
      .status(404)
      .send({ payload: "Not Mails exists against such user" });
  }
});

router.get("/inbox/unread", auth, async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    const unreadMails = await Mail.find({
      receiverId: decode._id,
      isread: req.body.isread
    });
    console.log(unreadMails);
    if (!(unreadMails.length > 0 && unreadMails.isArray()))
      return res
        .status(404)
        .send({ payload: "Not Mails exists against such user" });
    return res.status(200).send({ payload: unreadMails });
  } catch (ex) {
    return res
      .status(404)
      .send({ payload: "Not Mails exists against such user" });
  }
});

router.get("/sent", auth, async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    console.log(decode._id);
    const sendMails = await Mail.find({ senderId: decode._id });
    if (!(sendMails.length > 0 && sendMails.isArray()))
      return res
        .status(404)
        .send({ payload: "Not Mails exists against such user" });
    return res.status(200).send({ payload: sendMails });
  } catch (ex) {
    return res
      .status(404)
      .send({ payload: "Not Mails exists against such user" });
  }
});

module.exports = router;
