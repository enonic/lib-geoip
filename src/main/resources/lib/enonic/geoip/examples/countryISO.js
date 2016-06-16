var geoLib = require('/lib/enonic/geoip');

var locationData = geoLib.getLocationData('67.161.18.244');

// BEGIN
// Gets the country ISO code from the supplied locationData object.
var result = geoLib.countryISO(locationData);

if (result) {
    log.info(result);
} else {
    log.info('No country ISO code for that IP address.');
}
// END

//BEGIN
// City name
var expected = 'US';
// END