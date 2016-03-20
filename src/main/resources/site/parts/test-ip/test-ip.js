var geoipLib = require('/lib/enonic/geoip');

var thymeleaf = require('/lib/xp/thymeleaf');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var view = resolve('test-ip.html');
    var model = {};
    //model.req = JSON.stringify(req, null, 4);

    //log.info(model.req);

    // Run the tests.
    //model.test = geoipLib.test();

    //var ip = req.headers['X-Forwarded-For'] || req.host;
    var ip = '67.161.18.244'; // Only for testing on localhost. Change this later
    //var ip = '2620:0:2d0:200::7'; // IPV6



    //var info = geoipLib.cityInfo(ip);
    var info = geoipLib.getLocationData(ip, '/GeoLite2-City.mmdb', 'GeoLite2-City.mmdb');

    //var info = geoipLib.cityInfo('67.161.18.244');
    //var info = geoipLib.cityInfo('80.65.59.14');


    model.city = JSON.stringify(info, null, 4);

    model.cityName = geoipLib.cityName(info) || 'No city name';
    model.countryName = geoipLib.countryName(info) || 'No country name';
    model.countryISO = geoipLib.countryISO(info) || 'No country ISO';
    model.cityGeoPoint = geoipLib.cityGeoPoint(info) || 'No geo point';


    return {
        body: thymeleaf.render(view, model)
    };
}