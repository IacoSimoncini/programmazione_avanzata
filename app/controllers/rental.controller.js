const db = require("../models");
const utils = require('../utils/utils.js')
const Rental = db.rental;
const Vehicles = db.vehicles; 
const Parkings = db.parking;
const Users = db.users;
const Op = db.Sequelize.Op;

/**
 * Start a rent
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.start = async (req, res) => {
    async function getTypeFromId(id_veicolo){
        var type = "";
        const vehicle= await Vehicles.findOne({
                where: {
                    id_vehicle: id_veicolo
                }
            }
        ).then(data => {
            type = data.type;
        })
        return type; 
    }
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
            id_vehicle: req.params.id,
            type_vehicle: await getTypeFromId(req.params.id)
            
        };
        
        const vehicle = await Vehicles.findOne({
            where: {
                id_vehicle: rental.id_vehicle
            }
        });
        if (vehicle) {
            await Vehicles.update({ 
                nol: false 
            },
            {
                where: {
                    id_vehicle: rental.id_vehicle
                }
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while updating"
                });
            });
            console.log(req.user.emai)
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

/**
 * Stop a rent
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
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
        if (!data){
            return res.status(400).send({
                message: "Bad request."
            });
        }
        id_vehicle = data.id_vehicle;
        start = data.start;
    }).catch(err => {
        return res.status(500).send({
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
        return res.status(500).send({
            message: err.message || "Internal server error."
        });
    });
    const vehicle = await Vehicles.findOne({
        where: {
            id_vehicle: id_vehicle
        }
    }).then(data => {
        type = data.type;
    }).catch(err => {
        return res.status(500).send({
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
            return res.status(500).send({
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
        return res.status(500).send({
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
        return res.status(500).send({
            message: err.message || "Internal server error."
        });
    });
    await Vehicles.update({
        nol: true
    }, {
        where: {
            id_vehicle: id_vehicle
        }
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Internal server error."
        });
    })
    return res.status(200).send({
        message: credit
    });
}

/**
 * Returns the list of rentals made by a specific user.
 * Returns a json constructed as follows:
 *      - Lista dei noleggi
 *      - Categoria
 *          - Costo minimo
 *          - Costo massimo
 *          - Costo medio
 *          - Durata minima
 *          - Durata massima
 *          - Durata media
 *      - Noleggi effettuati
 *      - Credito residuo
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.done = async (req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.user.email
        }
    })
    const rent = await Rental.findAll({
        where: {email: req.user.email}
    }).then(rent=> {

        var arr_bike = []
        var arr_ebike = []
        var arr_escooter = []
        var arr_tandem = []
        var all_rent = []
        
        if (req.body.start && req.body.end) {
            all_rent = rent.filter(x => { if (x.start >= req.body.start && x.end <= req.body.end) return x });
            arr_bike = all_rent.filter(x => x.type_vehicle === "bike");
            arr_ebike = all_rent.filter(x => x.type_vehicle === "ebike");
            arr_escooter = all_rent.filter(x => x.type_vehicle === "escooter");
            arr_tandem = all_rent.filter(x => x.type_vehicle === "tandem");
        } else {
            all_rent = rent;
            arr_bike = rent.filter(x => x.type_vehicle === "bike");
            arr_ebike = rent.filter(x => x.type_vehicle === "ebike");
            arr_escooter = rent.filter(x => x.type_vehicle === "escooter");
            arr_tandem = rent.filter(x => x.type_vehicle === "tandem");
        }

        var price_avg_bike = 0;
        var price_min_bike = 0;
        var price_max_bike = 0;
        var time_avg_bike = 0;
        var time_min_bike = 0;
        var time_max_bike = 0;

        var price_avg_ebike = 0;
        var price_min_ebike = 0;
        var price_max_ebike = 0;
        var time_avg_ebike = 0;
        var time_min_ebike = 0;
        var time_max_ebike = 0;

        var price_avg_escooter = 0;
        var price_min_escooter = 0;
        var price_max_escooter = 0;
        var time_avg_escooter = 0;
        var time_min_escooter = 0;
        var time_max_escooter = 0;

        var price_avg_tandem = 0;
        var price_min_tandem = 0;
        var price_max_tandem = 0;
        var time_avg_tandem = 0;
        var time_min_tandem = 0;
        var time_max_tandem = 0;
        
        if(arr_bike.length > 0) {
            price_avg_bike = arr_bike.reduce((total,next) => total + next.payment, 0) / arr_bike.length;
            price_min_bike = arr_bike.reduce((prev,curr) => prev.payment < curr.payment ? prev : curr);
            price_max_bike = arr_bike.reduce((prev,curr) => prev.payment > curr.payment ? prev : curr);
            time_avg_bike = arr_bike.reduce((total,next) => total + utils.convert_time(next.start, next.end), 0) / arr_bike.length;
            time_min_bike = arr_bike.reduce((prev,curr) => utils.convert_time(prev.start,prev.end) < utils.convert_time(curr.start, curr.end) ? prev : curr);
            time_max_bike = arr_bike.reduce((prev,curr) => utils.convert_time(prev.start,prev.end) > utils.convert_time(curr.start, curr.end) ? prev : curr);
            time_min_bike.conv = utils.convert_time(time_min_bike.start, time_min_bike.end);
            time_max_bike.conv = utils.convert_time(time_max_bike.start, time_max_bike.end);
        }

        if (arr_ebike.length > 0) {
            price_avg_ebike = arr_ebike.reduce((total,next) => total + next.payment, 0) / arr_ebike.length;
            price_min_ebike = arr_ebike.reduce((prev,curr) => prev.payment < curr.payment ? prev : curr);
            price_max_ebike = arr_ebike.reduce((prev,curr) => prev.payment > curr.payment ? prev : curr);
            time_avg_ebike = arr_ebike.reduce((total,next) => total + utils.convert_time(next.start, next.end), 0) / arr_ebike.length;
            time_min_ebike = arr_ebike.reduce((prev,curr)=>utils.convert_time(prev.start,prev.end) < utils.convert_time(curr.start,curr.end) ?prev:curr);
            time_max_ebike = arr_ebike.reduce((prev,curr)=>utils.convert_time(prev.start,prev.end) > utils.convert_time(curr.start,curr.end) ? prev:curr);
            time_min_ebike.conv = utils.convert_time(time_min_ebike.start, time_min_ebike.end);
            time_max_ebike.conv = utils.convert_time(time_max_ebike.start, time_max_ebike.end);
        }

        if (arr_escooter.length > 0) {
            price_avg_escooter = arr_escooter.reduce((total,next)=>total+next.payment,0)/arr_escooter.length;
            price_min_escooter = arr_escooter.reduce((prev,curr)=>prev.payment<curr.payment ?prev:curr);
            price_max_escooter = arr_escooter.reduce((prev,curr)=>prev.payment>curr.payment ?prev:curr);
            time_avg_escooter = arr_escooter.reduce((total,next)=>total+utils.convert_time(next.start,next.end),0)/arr_escooter.length;
            time_min_escooter = arr_escooter.reduce((prev,curr)=>utils.convert_time(prev.start,prev.end) < utils.convert_time(curr.start,curr.end) ?prev:curr);
            time_max_escooter = arr_escooter.reduce((prev,curr)=>utils.convert_time(prev.start,prev.end) > utils.convert_time(curr.start,curr.end) ? prev:curr);
            time_min_escooter.conv = utils.convert_time(time_min_escooter.start, time_min_escooter.end);
            time_max_escooter.conv = utils.convert_time(time_max_escooter.start, time_max_escooter.end);
        }

        if (arr_tandem.length > 0) {
            price_avg_tandem = arr_tandem.reduce((total,next) => total + next.payment, 0) / arr_tandem.length;
            price_min_tandem = arr_tandem.reduce((prev,curr) => prev.payment < curr.payment ? prev : curr);
            price_max_tandem = arr_tandem.reduce((prev,curr) => prev.payment > curr.payment ? prev : curr);
            time_avg_tandem = arr_tandem.reduce((total,next) => total + utils.convert_time(next.start, next.end), 0) / arr_tandem.length;
            time_min_tandem = arr_tandem.reduce((prev,curr) => utils.convert_time(prev.start,prev.end) < utils.convert_time(curr.start,curr.end) ? prev:curr);
            time_max_tandem = arr_tandem.reduce((prev,curr) => utils.convert_time(prev.start,prev.end) > utils.convert_time(curr.start,curr.end) ? prev:curr);
            time_min_tandem.conv = utils.convert_time(time_min_tandem.start, time_min_tandem.end);
            time_max_tandem.conv = utils.convert_time(time_max_tandem.start, time_max_tandem.end);
        }
        
        const nol_done = rent.length;
        const credito_residuo = user.credit;
        
        var jsonResponse = {
            "List_rent": {

            },
            "Bike": {
                "Min cost": price_min_bike.payment,
                "Max cost": price_max_bike.payment,
                "Mean cost" : price_avg_bike,
                "Min time": time_min_bike.conv,
                "Max time": time_max_bike.conv,
                "Mean time": time_avg_bike
            },
            "Ebike": {
                "Min cost": price_min_ebike.payment,
                "Max cost": price_max_ebike.payment,
                "Mean cost" : price_avg_ebike,
                "Min time": time_min_ebike.conv,
                "Max time": time_max_ebike.conv,
                "Mean time":time_avg_ebike
            },
            "Escooter": {
                "Min cost": price_min_escooter.payment,
                "Max cost": price_max_escooter.payment,
                "Mean cost" : price_avg_escooter,
                "Min time": time_min_escooter.conv,
                "Max time": time_max_escooter.conv,
                "Mean time":time_avg_escooter
            },
            "Tandem": {
                "Min cost": price_min_tandem.payment,
                "Max cost": price_max_tandem.payment,
                "Mean cost" : price_avg_tandem,
                "Min time": time_min_tandem.conv,
                "Max time": time_max_tandem.conv,
                "Mean time":time_avg_tandem
            },
            "Rentals made": nol_done,
            "Remaining credit": credito_residuo,
    }
    jsonResponse["List_rent"] = all_rent;
        res.status(200).send(jsonResponse);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Internal server error."
        });
    })

}