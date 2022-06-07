Vehicles=[
    {
        "id": 1,
        "code": 1,
        "type": "bike",
        "lat": -83.27428,
        "long": -47.53882,
        "nol": true,
        "createdAt": "2013-11-03T11:00:00.000Z",
        "updatedAt": "2022-06-07T16:02:50.217Z"
    },
    {
        "id": 2,
        "code": 2,
        "type": "bike",
        "lat": 3.49079,
        "long": -160.96622,
        "nol": true,
        "createdAt": "2014-11-03T11:00:00.000Z",
        "updatedAt": "2022-06-07T16:16:30.502Z"
    }
]

function getTypeFromId(id_veicolo){
    const vehicle= Vehicles.findOne(
    {
        where: {
            id: id_veicolo
        }
    }

)
return vehicle.type; 
}

getTypeFromId(1)

