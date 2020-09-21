const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../vars/vars.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "Whoops! you are not authorized :(" });
            } else {
                req.jwt = decodedToken;

                next();
            }
        });
    } else {
        res.status(401).json({ message: "NWhops! you did not provide a token :(" });
    }
};