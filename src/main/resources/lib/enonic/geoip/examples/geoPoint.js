var geoLib = require('/lib/enonic/geoip');

var locationData = geoLib.getLocationData('67.161.18.244', '/GeoLite2-City.mmdb', 'GeoLite2-City.mmdb');

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