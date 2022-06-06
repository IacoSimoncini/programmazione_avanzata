const db = require("../models");
const Parking = db.parking;
const Op = db.Sequelize.Op;
const utils = require('../utils/utils.js')

exports.create = (req, res) => {
    const parking = {
        lat: req.body.lat,
        long: req.body.long
    };
    Parking.create(parking)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating parking"
            });
        });
};

exports.parkingZone = async (req, res) => {

    const position = {
        lat: req.body.lat,
        long: req.body.long
    };

    var listPark = [];
    
    const parkings = await Parking.findAll()
        .then(parking => { 
            parking.map(x => {
                let d = utils.Harvesine(Number(x.lat), Number(position.lat), Number(x.long), Number(position.long));
                if (d < 50.0) {
                    listPark.push({
                        lat: x.lat,
                        long: x.long
                    });
                }
            });
            res.status(200).send(listPark);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Internal server error."
            })
        });
};
