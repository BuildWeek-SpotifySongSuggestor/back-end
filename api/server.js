const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router.js");
const favoritesRouter = require("../favorites/favorites-router.js");
const usersRouter = require("../users/users-router.js");
const tracksRouter = require("../tracks/tracks-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(
    cors({
        origin: "*",
        credentials: true, 
    })
);

//get request for heroku test
server.get('/', (req, res) => {
  res.status(200).json({ API: 'Up ad running' });
});

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use('/api/tracks', tracksRouter);
server.use('/api/favorites', favoritesRouter);

module.exports = server;