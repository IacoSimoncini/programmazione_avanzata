const db = require("../models");
const Vehicles = db.vehicles;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const vehicle = {
        nol: true,
        type: req.body.type,
        lat: req.body.lat,
        long: req.body.long,
        code: req.body.code
    };
    Vehicles.create(vehicle)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating vehicle"
            });
        });
};

exports.listAvailable = async (req, res) => {
    const vehicles = await Vehicles.findAll({
        where: {
                nol: true,
                type: req.params.type,
                lat: req.params.lat,
                long: req.params.long,
            }
        })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Internal server error."
            });
        });
};
