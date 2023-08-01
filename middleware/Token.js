const jwt = require("jsonwebtoken");

function createToken (data) {
  return jwt.sign(data, process.env.JWT_KEY, {expiresIn: "1hr"})
}

module.exports = createToken
  