const jwt = require("jsonwebtoken");
const db = require("../models");
const Users = db.users;
require('dotenv').config();

/*
*   Authentication of the user making the request
*/
exports.checkHeader = (req, res, next) => {
    const token = req.token;
    if (!token) {
        return res.status(403).send("Token is missing.");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);        // process.env.SECRET_KEY
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({
            message: "Invalid Token.",
            error: err
        });       
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
exports.checkCredit = async (req, res, next) => {
    const user = req.user;
    const User = await Users.findOne({
        where: {
            email: req.user.email
        }
    })
    .then(user => {
        if (user){
            if (user.credit < 0) {
                res.status(401).send("Unauthorized.");
            } else {
                next();
            }
        } else {
            res.status(400).send({
                message: "User not found."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Internal server error."
        })
    });
}

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next()
    } else {
        res.status(403).send({
            message: "Unauthorized."
        });
    }
}
