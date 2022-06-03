const db = require("../models");
const Rental = db.rental;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const rental = {
        email: req.user.email,
        payment: null,
        start: Date.now(),
        end: null
    };
    Rental.create(rental)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating parking"
            });
        });
};

