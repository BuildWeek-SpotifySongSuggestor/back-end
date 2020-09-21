const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');
const { CLIENT_ID, CLIENT_SECRET } = require('../vars/vars.js');

router.get('/:search', (req, res) => {
  const { search } = req.params;
  
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });

  spotifyApi.clientCredentialsGrant()
    .then(data => {
        spotifyApi.setAccessToken(data.body['access_token']);
        
        return  spotifyApi.searchTracks(search)
      })
      .then(data => {
        res.status(200).json(data.body)
      })
      .catch(error => {
        res.status(500).json({
          message: 'Whoops! we could not complete your search :(', 
          error: error.message
        });
      });
});

router.get('/:id/single', (req, res) => {
  const { id } = req.params;

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });

  spotifyApi
    .clientCredentialsGrant()
      .then(data => {
          spotifyApi.setAccessToken(data.body['access_token']);
          
          return  spotifyApi.getTrack(id)
        })
        .then(data => {
          res.status(200).json(data.body)
        })
        .catch(error => {
          res.status(500).json({
            message: 'Whoops! we encountered a problem :(', 
            error: error.message
          });
        });
});

router.post('/recover', (req, res) => {
  const { ids } = req.body;

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });

  spotifyApi
    .clientCredentialsGrant()
      .then(data => {
          spotifyApi.setAccessToken(data.body['access_token']);
          
          return  spotifyApi.getTracks(ids)
        })
        .then(data => {
          res.status(200).json(data.body)
        })
        .catch(error => {
          res.status(500).json({
            message: 'Whoops! we encountered a problem :(', 
            error: error.message
          });
        });
});

module.exports = router;