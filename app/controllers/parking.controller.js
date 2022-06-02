const db = require("../models");
const Parking = db.parking;
const Op = db.Sequelize.Op;

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
                message: err.message || "Some error occurred while creating user"
            });
        });
};

exports.parkingZone = async (req, res) => {
    
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
        console.log(6371 * c);
        return 6371 * c;
    }

    const position = {
        lat: req.body.lat,
        long: req.body.long
    };
    
    const parkings = await Parking.findAll()
        .then(parking => { 
            parking.map(x => {Harvesine(Number(x.lat), Number(position.lat), Number(x.long), Number(position.long))});
            res.status(200).send({
                message: "ok"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Internal server error."
            })
        });
};
