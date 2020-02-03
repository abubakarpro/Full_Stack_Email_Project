const config = require("config");

module.exports = function() {
  if (!config.get("jwtPrivateKey")) {
    console.log("Fatel error : private key is not define");
    process.exit(1);
  }
};
