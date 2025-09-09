var expressJwt = require("express-jwt");

function authJwt() {
  const secret = process.env.JSON_WEB_TOKEN_SECRET_KEY;
  return expressJwt({ secret: secret, algorithms: ["HS256"] });
}

module.exports = authJwt;
