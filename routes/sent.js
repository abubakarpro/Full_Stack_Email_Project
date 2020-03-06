const { Mail } = require("../models/mail");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authmiddleware");
const config = require("config");
const jwt = require("jsonwebtoken");

router.get("/", auth, async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    const sendMails = await Mail.find({
      senderId: decode._id
    }).populate("receiverId", { name: 1, email: 1 });

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

router.get("/:id", auth, async (req, res) => {
  try {
    const singleMail = await Mail.findOneAndUpdate(
      { _id: req.params.id },
      { isread: true },
      { new: true }
    ).populate("receiverId", { name: 1, email: 1 });

    return res.status(200).send({ payload: singleMail });
  } catch (ex) {
    return res
      .status(404)
      .send({ payload: "Not Mails exists against such user" });
  }
});

module.exports = router;
