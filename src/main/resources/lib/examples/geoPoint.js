var geoLib = require('/lib/geoip');

var locationData = geoLib.getLocationData('67.161.18.244');

// BEGIN
// Gets the latitude and longitude from the supplied locationData object.
var result = geoLib.geoPoint(locationData);

if (result) {
    log.info(result);
} else {
    log.info('No geo location for that IP address.');
}
// END

//BEGIN
// City name
var expected = '37.6534,-122.4231';
// END