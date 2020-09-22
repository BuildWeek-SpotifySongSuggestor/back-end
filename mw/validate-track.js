module.exports = {
  validateTrack
}

function validateTrack(req, res, next) {
  const body = req.body;
  const track = body.track_id;
  const user = body.user_id;
  
  if (track === undefined) {
    res.status(400).json({
      message: "Whoops! you are missing the track ID :("
    });
  }
  if (user === undefined) {
    res.status(400).json({
      message: "Whoops! you are missing the user ID :("
    });
  }
  next();
}