/**
 * This module handles requests related to "users" table in the database
 */
const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

/**
 * Create user in database.
 * 
 * @param {Request} req The req object represents the HTTP request
 * @param {Response} res The res object represents the HTTP response
 */
exports.create = (req, res) => {
    const user = {
        email: req.body.email,
        credit: req.body.credit,
        lat: req.body.lat,
        long: req.body.long,
        role: "user"
    };
    Users.create(user)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating user"
            });
        });
};

/**
 * Returns a user's credit. 
 * 
 * @param {Request} req The req object represents the HTTP request
 * @param {Response} res The res object represents the HTTP response
 */
exports.credit = (req, res) => {
    Users.findOne({
        where: {
            email: req.user.email
        }
    }).then(data => {
        if (data) {
            return res.status(200).send({
                credit: data.credit
            });
        } else {
            return res.status(404).send({
                message: "Not found."
            })
        }  
    })
    .catch(err => {
        return res.status(500).send({
            message: err.message || "Internal server error."
        });
    });
};

/**
 * Update a user's credit. If there are no errors the user's credit is updated 
 * otherwise the message "Not found" is returned.
 * 
 * @param {Request} req The req object represents the HTTP request
 * @param {Response} res The res object represents the HTTP response
 */
exports.updateCredit = async (req, res) => {
    await Users.update(
        {
            credit: req.body.credit
        },
        {
            where: { email: req.body.email }
        }
    ).then(data => {
        console.log(data)
        if (data[0] !== 0) {
            return res.status(200).send({
                message: "Credit updated."
            });
        } else {
            return res.status(404).send({
                message: "Not found."
            })
        }
    })
    .catch (err => {
        return res.status(500).send({
            message: err.message || "Internal server error."
        });
    });
}
