const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const user = {
        email: req.body.email,
        credit: req.body.credit,
        lat: req.body.lat,
        long: req.body.long
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

exports.credit = (req, res) => {
    Users.findAll({
        where: {
            email: req.user.email
        }
    }).then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({
                message: "Not found."
            })
        }  
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Internal server error."
        });
    });
};
