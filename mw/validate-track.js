module.exports = {
  validateTrack
}

function validateTrack(req, res, next) {
  const body = req.body;
  const spotify = body.spotify_id;
  const user = body.user_id;

  if (spotify === undefined) {
    res.status(400).json({
      message: "Whoops! you are missing the spotify ID :("
    });
  }
  if (user === undefined) {
    res.status(400).json({
      message: "Whoops! you are missing the user ID :("
    });
  }
  next();
}