const { render } = require("express/lib/response");
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
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Internal server error."
        });
    });
    var credit = 0;
    await Users.findOne({
        where: {
            email: req.user.email
        }
    }).then(data => {
        credit = data.credit;
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Internal server error."
        });
    });
    const vehicle = await Vehicles.findOne({
        where: {
            code: id_vehicle
        }
    }).then(data => {
        type = data.type;
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Internal server error."
        });
    });
    let payment = 0;
    let end = Date.now();
    var time = utils.convert_time(start, end);
    let multiplier = 2;
    const parkings = await Parkings.findAll()
        .then(parking => {
            parking.map(x => {
                let d = utils.Harvesine(req.body.lat, x.lat, req.body.long, x.long);
                if (d < 50){
                    multiplier = 1;
                }
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Internal server error."
            });
        });
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
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Internal server error."
        })
    });
    credit = credit - payment;
    await Users.update({
        credit: credit
    }, {
        where:{
            email: req.user.email
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Internal server error."
        });
    });
    await Vehicles.update({
        nol: true
    }, {
        where: {
            code: id_vehicle
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Internal server error."
        });
    })
    res.status(200).send({
        message: credit
    });
}
exports.done = async (req, res) => {
    const rent = await Rental.findAll({
        where: {email: req.user.email}
    }).then(rent=> {
        const price_avg=rent.reduce((total,next)=>total+next.payment,0)/rent.length;
        const price_min=rend.reduce((prev,curr)=>prev.payment<curr.payment ?prev:curr);
        const price_max=rend.reduce((prev,curr)=>prev.payment>curr.payment ?prev:curr);
        const time_avg=rend.reduce((total,next)=>total+utils.convert_time(next.start,next.end),0)/rent.length;
        const time_min=rend.reduce((prev,curr)=>utils.convert_time(prev.start,prev.end) < utils.convert_time(curr.start,curr.end) ?prev:curr);
        const time_max=rend.reduce((prev,curr)=>utils.convert_time(prev.start,prev.end) > utils.convert_time(curr.start,curr.end) ?prev:curr);
        const nol_done=rend.length;
        const credito_residuo=req.user.credit;
        res.status(200).send({
           "prezzo medio" :price_avg,
           "prezzo minimo":price_min,
           "prezzo massimo":price_max,
           "durata media":time_avg,
           "durata minima":time_min,
           "durata massima": time_max,
           "noleggi effettuati": nol_done,
           "credito residuo":credito_residuo
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Internal server error."
        });
    })

}