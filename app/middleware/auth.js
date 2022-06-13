/**
 * this module manages the authorization of requests made by the user.
 */
const jwt = require("jsonwebtoken");
const db = require("../models");
const Users = db.users;
require('dotenv').config();

/**
 * Authentication of the user making the request.
 * Performs token decryption and in case of error returns "Invalid Token".
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next Indicating the next middleware function.
 * @return {}
 */
exports.checkHeader = (req, res, next) => {
    const token = req.token;
    if (!token) {
        return res.status(400).send({
            message: "Invalid Token."
        }); 
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({
            message: "Invalid Token.",
            error: err
        });       
    }
    return next();
};

/**
 * User role verification. 
 * Check if the user's role is "admin" type, if yes return next, otherwise return "Unauthorized".
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next Indicating the next middleware function.
 */
exports.checkUser = (req, res, next) => {
    const user = req.user;
    if (user.role != "admin") {
        return res.status(401).send({
            message: "Unauthorized."
        }); 
    } else {
        return next();
    }
};

/**
 * User credit verification. 
 * If the user does not have sufficient credit it returns "Unauthorized" as a response.
 * If the user is not found within the database it returns "User not found" as a response.
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next Indicating the next middleware function.
 */
exports.checkCredit = async (req, res, next) => {
    const c = req.user;
    console.log(c)
    const User = await Users.findOne({
        where: {
            email: req.user.email
        }
    })
    .then(user => {
        if (user){
            if (user.credit < 0) {
                return res.status(401).send({
                    message: "Unauthorized."
                }); 
            } else {
                return next();
            }
        } else {
            return res.status(400).send({
                message: "User not found."
            });
        }
    })
    .catch(err => {
        return res.status(500).send({
            message: err.message || "Internal server error."
        })
    });
}

/**
 * Verify the bearer in the header of the request. 
 * If the token is not spelled correctly it generates an error
 * and returns "Unauthorized" as a response.
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next Indicating the next middleware function.
 */
exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        return next()
    } else {
        return res.status(401).send({
            message: "Unauthorized."
        }); 
    }
}
