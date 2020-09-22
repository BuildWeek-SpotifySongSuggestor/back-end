const db = require('../users/users-model.js');

module.exports = {
  validateUserId
}

function validateUserId(req, res, next) {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(400).json({
          message: "Whoops! invalid user ID :("
        }); 
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Whoops! mw validate user ID failure :("
      });
    });
}