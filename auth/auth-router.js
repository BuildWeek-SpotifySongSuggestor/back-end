const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const db = require("../users/users-model.js");
const { isValid } = require("../utils/is-valid.js");
const { BCRYPT_ROUNDS } = require('../vars/vars.js');
const { makeJwt } = require('../utils/jwt.js');

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
      const salt = bcryptjs.genSaltSync(Number(BCRYPT_ROUNDS));
      const hash = bcryptjs.hashSync(credentials.password, salt);

      credentials.password = hash;

      db.add(credentials)
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

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
      db.findBy({ username: username })
          .then(([user]) => {

              if (user && bcryptjs.compareSync(password, user.password)) {
                  const token = makeJwt(user);

                  res.status(200).json({ token });
              } else {
                  res.status(401).json({ message: "Whoops! invalid credentials :(" });
              }
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