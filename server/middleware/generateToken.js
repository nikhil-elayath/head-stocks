const jwt = require("jsonwebtoken");
const config = require("config");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

module.exports = payload => {
  const token = jwt.sign(payload, "headStocks", {
    expiresIn: "12s",
  });

  return token;
};
