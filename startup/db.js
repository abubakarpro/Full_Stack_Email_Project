const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect(
      "mongodb+srv://database123:database123@cluster0-vosrt.mongodb.net/test"
    )
    .then(() => {
      console.log("connent to db");
    })
    .catch(err => {
      err.log("could not connect to db", err);
    });
};
