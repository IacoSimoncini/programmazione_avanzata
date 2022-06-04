const db = require("../models");
const Vehicles = db.vehicles;
const Op = db.Sequelize.Op;

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
    function toRad(x) {
        return x * Math.PI / 180;
    }

    function Harvesine(lat1, lat2, long1, long2) {
        var x1 = lat1 - lat2;
        var x2 = long2 - long1;
        var Lat = toRad(x1);
        var Long = toRad(x2);
        var a = Math.sin(Lat / 2) * Math.sin(Lat / 2) + Math.cos(toRad(lat2)) * Math.cos(toRad(lat1)) * Math.sin(Long / 2) * Math.sin(Long / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = 6371 * c; 
        return d
    }


    const vehicles = await Vehicles.findAll()
    for(var i=0; i<vehicles.length; i++){
        var dist = Harvesine(req.params.lat,i.lat,req.params.long,i.long);
        vehicles[i]['distance'] = dist;
    }
    //sort/-61.82858/151.50799
    function compare(a,b) {
        if (a.distance < b.distance)
           return -1;
        if (a.distance > b.distance)
          return 1;
        return 0;
      }
      vehicles.sort(compare)        
      .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Internal server error."
        });
    });

      

}
