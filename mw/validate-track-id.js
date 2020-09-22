const db = require('../favorites/favorites-model.js');

module.exports = {
  validateTrackId
}

function validateTrackId(req, res, next) {
  const { id } = req.params;

  db.getById(id)
    .then(track => {
      if (track) {
        next();
      } else {
        res.status(400).json({
          message: "Whoops! invalid track ID :("
        }); 
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Whoops! mw validate track ID failure :("
      });
    });
}