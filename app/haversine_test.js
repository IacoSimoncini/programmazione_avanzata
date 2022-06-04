vehicles=[
    {
        "id": 3,
        "code": 3,
        "type": "byke",
        "lat": 2.82576,
        "long": -115.51796,
        "nol": true,
        "createdAt": "2015-11-03T11:00:00.000Z",
        "updatedAt": "2015-11-03T11:00:00.000Z"
    },
    {
        "id": 2,
        "code": 2,
        "type": "byke",
        "lat": 3.49079,
        "long": -160.96622,
        "nol": true,
        "createdAt": "2014-11-03T11:00:00.000Z",
        "updatedAt": "2014-11-03T11:00:00.000Z"
    },
    {
        "id": 1,
        "code": 1,
        "type": "byke",
        "lat": -83.27428,
        "long": -47.53882,
        "nol": true,
        "createdAt": "2013-11-03T11:00:00.000Z",
        "updatedAt": "2013-11-03T11:00:00.000Z"
    }
]

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

for(var i=0; i<vehicles.length; i++){
        var dist = Harvesine(4.88350,i.lat, -81.84767,i.long);
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
      console.log(vehicles.sort(compare))