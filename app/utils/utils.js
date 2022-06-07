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
    return d / 1000;
}
function convert_time(a, b) {
    var dateA = new Date(a);
    var dateB = new Date(b);
    return dateB.getHours() * 60 + dateB.getMinutes() - dateA.getHours() * 60 - dateA.getMinutes();
}
module.exports = { Harvesine: Harvesine, convert_time: convert_time };
//# sourceMappingURL=utils.js.map