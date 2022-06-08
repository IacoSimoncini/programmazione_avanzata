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
    async function getTypeFromId(id_veicolo){
        var type = "";
        const vehicle= await Vehicles.findOne({
                where: {
                    id: id_veicolo
                }
            }
        ).then(data => {
            type = data.type;
            console.log(data.type)
        })
        console.log("************************************************",type)
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
    const user = await Users.findOne({
        where: {
            email: req.user.email
        }
    })
    const rent = await Rental.findAll({
        where: {email: req.user.email}
    }).then(rent=> {

        if(req.body){
            rent.filter(x=>{x.start>=req.body.start && x.end<=req.body.end})
            console.log(rent.filter(x=>{x.start>=req.body.start && x.end<=req.body.end}))
        }

        const price_avg_bike=rent.filter(x=>x.type_vehicle==="bike").reduce((total,next)=>total+next.payment,0)/rent.length;
        const price_avg_ebike=rent.filter(x=>x.type_vehicle==="ebike").reduce((total,next)=>total+next.payment,0)/rent.length;
        const price_avg_escooter=rent.filter(x=>x.type_vehicle==="escooter").reduce((total,next)=>total+next.payment,0)/rent.length;
        const price_avg_tandem=rent.filter(x=>x.type_vehicle==="tandem").reduce((total,next)=>total+next.payment,0)/rent.length;

        const price_min_bike=rent.filter(x=>x.type_vehicle==="bike").reduce((prev,curr)=>prev.payment<curr.payment ?prev:curr);
        const price_min_ebike=rent.filter(x=>x.type_vehicle==="ebike").reduce((prev,curr)=>prev.payment<curr.payment ?prev:curr);
        const price_min_escooter=rent.filter(x=>x.type_vehicle==="escooter").reduce((prev,curr)=>prev.payment<curr.payment ?prev:curr);
        const price_min_tandem=rent.filter(x=>x.type_vehicle==="tandem").reduce((prev,curr)=>prev.payment<curr.payment ?prev:curr);

        const price_max_bike=rent.filter(x=>x.type_vehicle==="bike").reduce((prev,curr)=>prev.payment>curr.payment ?prev:curr);
        const price_max_ebike=rent.filter(x=>x.type_vehicle==="ebike").reduce((prev,curr)=>prev.payment>curr.payment ?prev:curr);
        const price_max_escooter=rent.filter(x=>x.type_vehicle==="escooter").reduce((prev,curr)=>prev.payment>curr.payment ?prev:curr);
        const price_max_tandem=rent.filter(x=>x.type_vehicle==="tandem").reduce((prev,curr)=>prev.payment>curr.payment ?prev:curr);

        const time_avg_bike=rent.filter(x=>x.type_vehicle==="bike").reduce((total,next)=>total+utils.convert_time(next.start,next.end),0)/rent.length;
        const time_avg_ebike=rent.filter(x=>x.type_vehicle==="ebike").reduce((total,next)=>total+utils.convert_time(next.start,next.end),0)/rent.length;
        const time_avg_escooter=rent.filter(x=>x.type_vehicle==="escooter").reduce((total,next)=>total+utils.convert_time(next.start,next.end),0)/rent.length;
        const time_avg_tandem=rent.filter(x=>x.type_vehicle==="tandem").reduce((total,next)=>total+utils.convert_time(next.start,next.end),0)/rent.length;

        const time_min_bike=rent.filter(x=>x.type_vehicle==="bike").reduce((prev,curr)=>utils.convert_time(prev.start,prev.end) < utils.convert_time(curr.start,curr.end) ?prev:curr);
        const time_min_ebike=rent.filter(x=>x.type_vehicle==="ebike").reduce((prev,curr)=>utils.convert_time(prev.start,prev.end) < utils.convert_time(curr.start,curr.end) ?prev:curr);
        const time_min_escooter=rent.filter(x=>x.type_vehicle==="escooter").reduce((prev,curr)=>utils.convert_time(prev.start,prev.end) < utils.convert_time(curr.start,curr.end) ?prev:curr);
        const time_min_tandem=rent.filter(x=>x.type_vehicle==="tandem").reduce((prev,curr)=>utils.convert_time(prev.start,prev.end) < utils.convert_time(curr.start,curr.end) ?prev:curr);

        const time_max_bike=rent.filter(x=>x.type_vehicle==="bike").reduce((prev,curr)=>utils.convert_time(prev.start,prev.end) > utils.convert_time(curr.start,curr.end) ? prev:curr);
        const time_max_ebike=rent.filter(x=>x.type_vehicle==="ebike").reduce((prev,curr)=>utils.convert_time(prev.start,prev.end) > utils.convert_time(curr.start,curr.end) ? prev:curr);
        const time_max_escooter=rent.filter(x=>x.type_vehicle==="escooter").reduce((prev,curr)=>utils.convert_time(prev.start,prev.end) > utils.convert_time(curr.start,curr.end) ? prev:curr);
        const time_max_tandem=rent.filter(x=>x.type_vehicle==="tandem").reduce((prev,curr)=>utils.convert_time(prev.start,prev.end) > utils.convert_time(curr.start,curr.end) ? prev:curr);

        const nol_done=rent.length;
        const credito_residuo=user.credit;
        res.status(200).send(

            [{
                "noleggi effettuati": nol_done,
                "credito residuo": credito_residuo,
            },
                {
                "prezzo medio bike" :price_avg_bike,
                "prezzo minimo bike":price_min_bike.payment,
                "prezzo massimo bike":price_max_bike.payment,
                "durata media bike":time_avg_bike,
                "durata minima bike":utils.convert_time(time_min_bike.start,time_min_bike.end),
                "durata massima bike":utils.convert_time(time_max_bike.start,time_max_bike.end)
            },
            {
                "prezzo medio ebike" :price_avg_ebike,
                "prezzo minimo ebike":price_min_ebike.payment,
                "prezzo massimo ebike":price_max_ebike.payment,
                "durata media ebike":time_avg_ebike,
                "durata minima ebike":utils.convert_time(time_min_ebike.start,time_min_ebike.end),
                "durata massima ebike":utils.convert_time(time_max_ebike.start,time_max_ebike.end)
            },
            {
                "prezzo medio escooter" :price_avg_escooter,
                "prezzo minimo escooter":price_min_escooter.payment,
                "prezzo massimo escooter":price_max_escooter.payment,
                "durata media escooter":time_avg_escooter,
                "durata minima escooter":utils.convert_time(time_min_escooter.start,time_min_escooter.end),
                "durata massima escooter":utils.convert_time(time_max_escooter.start,time_max_escooter.end)
            },
            {
                "prezzo medio tandem" :price_avg_tandem,
                "prezzo minimo tandem":price_min_tandem.payment,
                "prezzo massimo tandem":price_max_tandem.payment,
                "durata media tandem":time_avg_tandem,
                "durata minima tandem":utils.convert_time(time_min_tandem.start,time_min_tandem.end),
                "durata massima tandem":utils.convert_time(time_max_tandem.start,time_max_tandem.end)
            }
            ]
)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Internal server error."
        });
    })

}