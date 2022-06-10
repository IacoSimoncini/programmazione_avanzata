const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

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

exports.credit = (req, res) => {
    Users.findOne({
        where: {
            email: req.user.email
        }
    }).then(data => {
        if (data) {
            res.status(200).send({
                credit: data.credit
            });
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
            res.status(200).send({
                message: "Credit updated."
            });
        } else {
            res.status(404).send({
                message: "Not found."
            })
        }
    })
    .catch (err => {
        res.status(500).send({
            message: err.message || "Internal server error."
        });
    });
}
