const { parking, users } = require("../models");
const db = require("../models");
const utils = require('../utils/utils.js')
const Rental = db.rental;
const Vehicles = db.vehicles; 
const Parkings = db.parking;
const Users = db.users;
const Op = db.Sequelize.Op;

exports.start = async (req, res) => {
    var list = [];
    const check = await Rental.findAll({
        where: {
            email: req.user.email,
            end: null
        }
    }).then(data => {
        list = data;
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
    if (list.length != 0) {
        res.status(400).send({
            message: `${req.user.email} is already renting a vehicle.`
        });
    } else {
        const rental = {
            email: req.user.email,
            payment: null,
            start: Date.now(),
            end: null,
            id_vehicle: req.params.id
        };
        const vehicle = await Vehicles.findByPk(rental.id_vehicle);
        if (vehicle) {
            await Vehicles.update({ 
                nol: false 
            },
            {
                where: {
                    id: rental.id_vehicle
                }
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while updating"
                });
            });
            await Rental.create(rental)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating"
                });
            });
        } else {
            res.status(400).send({
                message: `${rental.id_vehicle} not found.`
            });
        }
    }
};

exports.stop = async (req, res) => {
    var id_vehicle = 0;
    var type = '';
    var start = 0;
    const rent = await Rental.findOne({
        where: {
            email: req.user.email,
            end: null
        }
    }).then(data => {
        id_vehicle = data.id_vehicle;
        start = data.start;
    });
    var credit = 0;
    await Users.findOne({
        where: {
            email: req.user.email
        }
    }).then(data => {
        credit = data.credit;
    });
    const vehicle = await Vehicles.findAll({
        where: {
            id: id_vehicle
        }
    }).then(data => {
        type = data.type;
    })
    let payment = 0;
    let end = Date.now();
    let time = (end / 60) - (start / 60);
    let multiplier = 2;
    var parkings = await Parkings.findAll();
    for (const parking in parkings){
        let d = utils.Harvesine(req.body.lat, parking.lat, req.body.long, parking.long);
        if (d < 50) {
            multiplier = 1;
            break;
        }
    }
    console.log(type)
    switch(type) {
        case 'bike':
            payment = Math.ceil((1 + (0.1 * time) * multiplier));
            break;
        case 'ebike':
            payment = (1 + (0.4 * time) * multiplier);
            break;
        case 'escooter':
            payment = (1 + (0.25 * time) * multiplier);
            break;
        case 'tandem':
            payment = Math.ceil((1 + (0.15 * time) * multiplier));
            break;
    }
    await Rental.update({ 
        end: end,
        payment: payment 
    },
    {
        where: {
            email: req.user.email,
            end: null
        }
    });
    credit = credit - payment;
    console.log(payment);
    await Users.update({
        credit: credit
    }, {
        where:{
            email: req.user.email
        }
    });
    res.status(200).send({
        message: credit
    })
}
