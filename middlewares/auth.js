const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    var token = req.header('x-access-token');

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        // req.body['userId'] = decoded;
        next();
    });
}