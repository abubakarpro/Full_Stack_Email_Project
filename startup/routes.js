const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const mails = require("../routes/mails");
const inbox = require("../routes/inbox");
const sent = require("../routes/sent");
const cors = require("cors");

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/users/", users);
  app.use("/api/auth/", auth);
  app.use("/api/mails/sent/", sent);
  app.use("/api/mails/inbox/", inbox);

  app.use("/api/mails/", mails);
};
