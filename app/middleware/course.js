const jwt = require("jsonwebtoken");
const config = require("config");
const logger = require("../loggar/logger");

const generateToken = (req, res, next) => {
  console.log(req.body.email);
  const token = jwt.sign({ email: req.body.email }, config.get("jwtPrivetKey"));

  res.cookie("jwt", token);
  next();
};
const auth = (req, res, next) => {
  console.log("234");
  try {
    const token = req.cookies.jwt;
    if (token == undefined) {
      res.redirect("/");
    }
    console.log(token);
    const decoded = jwt.verify(token, config.get("jwtPrivetKey"));
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    logger.info(error);
  }
};
module.exports = {
  auth,
  generateToken,
};
