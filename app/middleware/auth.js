const jwt = require("jsonwebtoken");

exports.verToken = (req, res, next) => {
    const token = req.body.token;
    if (!token) {
        return res.status(403).send("Token is missing.");
    }
    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        req.user = decoded;
        console.log("DECODED: ", decoded);
    } catch (err) {
        return res.status(401).send("Invalid Token.")        
    }
    return next();
};

exports.checkHeader = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        return next();
    } else {
        return res.status(403).send("Header is missing.");
    }
};

exports.checkUser = (req, res, next) => {
    const user = req.user;
    if (user.email != "admin") {
        res.status(401).send("Unauthorized.");
    } else {
        return next();
    }
};
