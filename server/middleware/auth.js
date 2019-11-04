const jwt = require("jsonwebtoken");
const config = require("config");

let validateToken = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token)
    return res.json({
      login: "failed",
      message: "No Token Found"
    });
  try {
    const verifyingToken = jwt.verify(token, config.get("privatekey"));
    console.log(verifyingToken);
    req.user = verifyingToken;
    next();
  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
      message: "Invalid token"
    });
  }
};

module.exports = validateToken;
