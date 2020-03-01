const { Mail, validateMail } = require("../models/mail");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authmiddleware");
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

router.post("/composed", auth, async (req, res) => {
  console.log("into composed");
  console.log(req.body.subject);
  console.log(req.body.message);

  // const { error } = validateMail(req.body);
  // if (error) return res.status(404).send(error.details[0].message);

  const token = req.header("x-auth-token");
  const decode = jwt.verify(token, config.get("jwtPrivateKey"));
  console.log(decode._id);

  const rid = "5e3085790b677a10502efefd";
  // const senderId = mongoose.Type.ObjectId(decode._id);

  const mail = new Mail({
    senderId: decode._id,
    receiverId: rid,
    subject: req.body.subject,
    body: req.body.message
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
        .send({ payload: "111 Not Mails exists against such user" });
    }
    return res.status(200).send({ payload: allMails });
  } catch (ex) {
    return res
      .status(404)
      .send({ payload: "2222 Not Mails exists against such user" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const singleMail = await Mail.findOne({
      _id: req.params.id
    });

    return res.status(200).send({ payload: singleMail });
  } catch (ex) {
    return res
      .status(404)
      .send({ payload: "Not Mails exists against such user" });
  }
});

module.exports = router;
