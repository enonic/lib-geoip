var geoLib = require('/lib/enonic/geoip');

var thymeleaf = require('/lib/xp/thymeleaf');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var view = resolve('test-ip.html');
    var model = {};
    //model.req = JSON.stringify(req, null, 4);

    //log.info(model.req);

    // Run the tests.
    //model.test = geoLib.test('/GeoLite2-City.mmdb', 'GeoLite2-City.mmdb', false);

    //var ip = req.headers['X-Forwarded-For'] || req.host;
    var ip = '67.161.18.244'; // Only for testing on localhost. Change this later
    //var ip = '2620:0:2d0:200::7'; // IPV6



    //var info = geoLib.locationDataFromFile(ip);
    var info = geoLib.getLocationData(ip, '/GeoLite2-City.mmdb', 'GeoLite2-City.mmdb');

    //var info = geoLib.locationDataFromFile('67.161.18.244');
    //var info = geoLib.locationDataFromFile('80.65.59.14');


    model.city = JSON.stringify(info, null, 4);

    model.cityName = geoLib.cityName(info) || 'No city name';
    model.countryName = geoLib.countryName(info) || 'No country name';
    model.countryISO = geoLib.countryISO(info) || 'No country ISO';
    model.geoPoint = geoLib.geoPoint(info) || 'No geo point';


    return {
        body: thymeleaf.render(view, model)
    };
}