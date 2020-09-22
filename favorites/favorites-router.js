const router = require('express').Router();

const db = require('./favorites-model.js');

router.post('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
  db.update(id, req.body)
    .then(track => {
      res.status(200).json(track)
    })
    .catch(error => {
      res.status(500).json({
        message: "Whoops! there was an error while updating the track :("
      });
    });
});

router.delete('/:id', (req, res) => {
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