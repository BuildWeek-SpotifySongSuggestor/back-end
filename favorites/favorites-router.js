const router = require('express').Router();

const { validateUserId } = require('../mw/validate-user.js');
const { validateTrackId } = require('../mw/validate-track-id.js');
const { validateTrack } = require('../mw/validate-track.js');
const db = require('./favorites-model.js');

router.post('/', validateTrack, (req, res) => {
  db.insert(req.body)
    .then(track => {
      res.status(201).json(track)
    })
    .catch(error => {
      res.status(500).json({ 
        message: 'Whoops! could not add track to favorites :(' 
      })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params;

  db.get(id)
    .then(tracks => {
      res.status(200).json(tracks)
    })
    .catch(error  => {
      res.status(404).json({ 
        message: 'Whoops! there was an error while getting your tracks :('
      })
    })
});

router.put('/:id', validateTrackId, validateTrack, (req, res) => {
  const { id } = req.params;
  db.update(id, req.body)
    .then(track => {
      res.status(200).json({ 
        message: 'track successfully changed!'
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Whoops! there was an error while updating the track :("
      });
    });
});

router.delete('/:id', validateTrackId, (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(success => {
      res.status(201).json({
        message: "successfully removed"
      })
      .catch(error => {
        res.status(500).json({
          message: "Whoops! there was an error while removing track :("
        });
      });
    });
});

module.exports = router;