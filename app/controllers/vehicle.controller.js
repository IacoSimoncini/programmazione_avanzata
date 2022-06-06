const db = require("../models");
const Vehicles = db.vehicles;
const Op = db.Sequelize.Op;
const utils = require('../utils/utils.js')

exports.create = (req, res) => {
    const vehicle = {
        nol: true,
        type: req.body.type,
        lat: req.body.lat,
        long: req.body.long
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
                //lat: req.params.lat,
                //long: req.params.long,
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

exports.sortVehicles=async(req,res)=>{
    var vehicles = [];
    var list_vehicles=[];
    if (req.body.type) {
        vehicles = await Vehicles.findAll({
            where: {
                type: req.body.type
            }
        });
    } else {
        vehicles = await Vehicles.findAll();
    }
    for(var i = 0; i < vehicles.length; i++){
        var dist = utils.Harvesine(req.user.lat,vehicles[i].lat, req.user.long,vehicles[i].long);
        vehicles[i]['distance'] = dist;
        list_vehicles.push(vehicles[i]);
    }
    //sort/4.88350/-81.84767
    function compare(a,b) {
        if (a.distance < b.distance)
           return -1;
        if (a.distance > b.distance)
          return 1;
        return 0;
      }
      sorted_vehicles = Promise.resolve(list_vehicles.sort(compare));
      sorted_vehicles.then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Internal server error."
        });
    });

}
