function toRad(x: number): number {
    return x * Math.PI / 180;
}

function Harvesine(lat1: number, lat2: number, long1: number, long2: number): number {
    var x1: number = lat1 - lat2;
    var x2: number = long2 - long1;
    var Lat: number = toRad(x1);
    var Long: number = toRad(x2);
    var a: number = Math.sin(Lat / 2) * Math.sin(Lat / 2) + Math.cos(toRad(lat2)) * Math.cos(toRad(lat1)) * Math.sin(Long / 2) * Math.sin(Long / 2);
    var c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d: number = 6371 * c; 
    return d / 1000;
}

function convert_time(a: number, b: number): number {
    var dateA: Date = new Date(a);
    var dateB: Date = new Date(b);
    return dateB.getHours() * 60 + dateB.getMinutes() - dateA.getHours() * 60 - dateA.getMinutes();
}

module.exports = { Harvesine, convert_time };
