const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = () => {
  console.log(
    "Decoded token: " +
      JSON.stringify(
        jwt.decode(global.returned_token, config.get("privatekey"))
      )
  );
  global.decoded_token = jwt.decode(
    global.returned_token,
    config.get("privatekey")
  );
  let err_message;
  jwt.verify(
    global.returned_token,
    config.get("privatekey"),
    (err, decoded) => {
      if (err) {
        localStorage.removeItem("token");
        console.log(err.message);
        err_message = err.message;
      }
    }
  );
  return err_message;
};
