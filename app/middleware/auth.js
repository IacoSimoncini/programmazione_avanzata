const jwt = require("jsonwebtoken");
const db = require("../models");
const Users = db.users;
require('dotenv').config();

/**
 * Authentication of the user making the request
 * 
 * @param {Request} req 
 * @param {Response} res
 * @param {next} next
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
 * User role verification
 * 
 * @param {Request} req 
 * @param {Response} res
 * @param {next} next
 * @return {}
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
 * User credit verification
 * 
 * @param {Request} req 
 * @param {Response} res
 * @param {next} next
 * @return {}
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
 * Verify the bearer in the header of the request
 * 
 * @param {Request} req 
 * @param {Response} res
 * @param {next} next
 * @return {}
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
