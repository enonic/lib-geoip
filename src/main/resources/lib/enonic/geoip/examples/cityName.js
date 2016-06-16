var geoLib = require('/lib/enonic/geoip');

var locationData = geoLib.getLocationData('67.161.18.244');

// BEGIN
// Gets the city name in English from the supplied locationData object.
var result1 = geoLib.cityName(locationData);

if (result1) {
    log.info(result1);
} else {
    log.info('No city name for that IP address.');
}
// END

// BEGIN
// Gets the city name in Japanese from the supplied locationData object.
var result2 = geoLib.cityName(locationData, 'ja');

if(result2) {
    log.info(result2);
} else {
    log.info('No city name for that IP address.')
}
// END

//BEGIN
// City name
var expected1 = 'South San Francisco';
var expected2 = 'サウスサンフランシスコ';
// END