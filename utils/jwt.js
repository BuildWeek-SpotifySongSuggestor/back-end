const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../vars/vars.js');

module.exports = {
  makeJwt,
}

function makeJwt({ id, username }) {
  const payload = {
      username,
      subject: id,
  };
  const config = {
      jwtSecret: JWT_SECRET,
  };
  const options = {
      expiresIn: "24 hours",
  };

  return jwt.sign(payload, config.jwtSecret, options);
}
