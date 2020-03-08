const mongoose = require("mongoose");

const mlab =
  "mongodb+srv://database123:database123@cluster0-vosrt.mongodb.net/test";

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
