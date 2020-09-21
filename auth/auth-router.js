const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service.js");
const { BCRYPT_ROUNDS } = require('../vars/vars.js');
const { makeJwt } = require('../utils/jwt.js');

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
      const hash = bcryptjs.hashSync(credentials.password, BCRYPT_ROUNDS);

      credentials.password = hash;

      Users.add(credentials)
          .then(user => {
              const token = makeJwt(user);

              res.status(201).json({ data: user, token });
          })
          .catch(error => {
              res.status(500).json({ message: error.message });
          });
  } else {
      res.status(400).json({
          message: "Whoops! you must provide a username and password :(",
      });
  }
});

module.exports = router;