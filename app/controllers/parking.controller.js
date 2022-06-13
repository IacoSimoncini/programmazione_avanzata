/**
 * This module handles requests related to "parking" table in the database
 */
const db = require("../models");
const Parking = db.parking;
const Op = db.Sequelize.Op;
const utils = require('../utils/utils.js')

/**
 * Create a parking in database.
 * 
 * @param {Request} req The req object represents the HTTP request
 * @param {Response} res The res object represents the HTTP response
 */
exports.create = (req, res) => {
    const lat = req.body.lat;
    const long = req.body.long;
    const parking = {
        lat: lat,
        long: long
    };
    Parking.create(parking)
        .then(data => {
            return res.status(200).send(data);
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating parking"
            });
        });
};

/**
 * Return the list of all parkings near the user. 
 * The user passes the latitude and longitude via the request body.
 * 
 * @param {Request} req The req object represents the HTTP request
 * @param {Response} res The res object represents the HTTP response
 */
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
            return res.status(200).send(listPark);
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message || "Internal server error."
            })
        });
};
