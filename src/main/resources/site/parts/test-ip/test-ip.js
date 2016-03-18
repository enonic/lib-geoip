var geoIpLib = require('/lib/geoip');

var thymeleaf = require('/lib/xp/thymeleaf');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var view = resolve('test-ip.html');
    var model = {};
    model.req = JSON.stringify(req, null, 4);

    // Run the tests.
    //model.city = geoIpLib.testMethod();

    var ip = req.headers['X-Forwarded-For'];
    var info = geoIpLib.cityInfo(ip);
    //var info = geoIpLib.cityInfo('67.161.18.244');
    //var info = geoIpLib.cityInfo('80.65.59.14');


    model.city = JSON.stringify(info, null, 4);

    model.cityName = geoIpLib.cityName(info) || 'No city name';
    model.countryName = geoIpLib.countryName(info) || 'No country name';
    model.countryISO = geoIpLib.countryISO(info) || 'No country ISO';
    model.cityGeoPoint = geoIpLib.cityGeoPoint(info) || 'No geo point';


    return {
        body: thymeleaf.render(view, model)
    };
}