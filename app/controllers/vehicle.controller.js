const db = require("../models");
const Vehicles = db.vehicles;
const Op = db.Sequelize.Op;
const utils = require('../utils/utils.js')

/**
 * Create vehicle in database
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.create = (req, res) => {
    const vehicle = {
        nol: true,
        type: req.body.type,
        lat: req.body.lat,
        long: req.body.long,
        id_vehicle: req.body.id_vehicle
    };
    Vehicles.create(vehicle)
        .then(data => {
            return res.status(200).send(data);
        })
        .catch(err => {
            return res.status(400).send({
                message: err.message || "Some error occurred while creating vehicle"
            });
        });
};

/**
 * Creates the list of vehicles available for rental
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.listAvailable = async (req, res) => {
    const vehicles = await Vehicles.findAll({
        where: {
                nol: true,
                type: req.params.type,
            }
        })
        .then(data => {
            return res.status(200).send(data);
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message || "Internal server error."
            });
        });
};

/**
 * List of vehicles available by type and distance from the user's position
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.filterVehicles = async(req, res) => {
    var vehicles = [];
    var list_vehicles=[];
    const filters = req.query;
    if (filters.type && filters.lat && filters.long) {
        vehicles = await Vehicles.findAll({
            where: {
                type: filters.type,
            }
        });
        for(var i = 0; i < vehicles.length; i++){
            var dist = utils.Harvesine(req.query.lat, vehicles[i].lat, req.query.long, vehicles[i].long);
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
        sorted_vehicles = Promise.resolve(list_vehicles.sort(compare))
            .then(data => {
                return res.status(200).send(data);
            })
            .catch(err => {
                return res.status(500).send({
                    message: err.message || "Internal server error."
                });
            });
    } else {
        return res.status(400).send({
            message: "Error in query. Can't find parameters for filtering."
        });
    }

}
