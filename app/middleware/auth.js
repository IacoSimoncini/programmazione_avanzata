const jwt = require("jsonwebtoken");

/*
*   Authentication of the user making the request
*/
exports.checkHeader = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).send("Token is missing.");
    }
    try {
        const decoded = jwt.verify(authHeader, 'SECRET_KEY');        // process.env.SECRET_KEY
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({
            message: "Invalid Token.",
            error: err
        })        
    }
    return next();
};

/*
*   User role verification
*/
exports.checkUser = (req, res, next) => {
    const user = req.user;
    if (user.role != "admin") {
        res.status(401).send("Unauthorized.");
    } else {
        return next();
    }
};

/*
*   User credit verification
*/
exports.checkCredit = (req, res, next) => {
    const user = req.user;
    if (user.credit < 0) {
        res.status(401).send("Unauthorized.");
    } else {
        return next();
    }
}

exports.decodeToken = (req, res, next) => {
    const token = req.body.token;
    if (!token) {
        return res.status(403).send("Token is missing.");
    }
    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');        // process.env.SECRET_KEY
        req.body = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token.")        
    }
    return next();
}
