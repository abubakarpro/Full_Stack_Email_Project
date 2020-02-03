const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect("mongodb://localhost/emaildatabase")
    .then(() => {
      console.log("connent to db");
    })
    .catch(err => {
      err.log("could not connect to db", err);
    });
};
