const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const mails = require("../routes/mails");
const cors = require("cors");

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/users/", users);
  app.use("/api/auth/", auth);
  app.use("/api/mails/", mails);
};
