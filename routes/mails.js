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

router.get("/allMails", auth, async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    const allMails = await Mail.find(
      { receiverId: decode._id } || { senderId: decode._id }
    );

    if (!(allMails.length > 0 && Array.isArray(allMails))) {
      return res
        .status(404)
        .send({ payload: "Not Mails exists against such user" });
    }
    return res.status(200).send({ payload: allMails });
  } catch (ex) {
    return res
      .status(404)
      .send({ payload: "Not Mails exists against such user" });
  }
});

router.get("/inbox", auth, async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    const receivedMails = await Mail.find({ receiverId: decode._id }).populate(
      "senderId",
      "name"
    );

    if (!(receivedMails.length > 0 && Array.isArray(receivedMails))) {
      return res
        .status(404)
        .send({ payload: "Not Mails exists against such user" });
    }
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

router.get("/sent", auth, async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    const sendMails = await Mail.find({ senderId: decode._id }).populate(
      "receiverId",
      "name"
    );
    if (!(sendMails.length > 0 && Array.isArray(sendMails))) {
      return res
        .status(404)
        .send({ payload: "Not Mails exists against such user" });
    }
    return res.status(200).send({ payload: sendMails });
  } catch (ex) {
    return res
      .status(404)
      .send({ payload: "Not Mails exists against such user" });
  }
});

module.exports = router;
