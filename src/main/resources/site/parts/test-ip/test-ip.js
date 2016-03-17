var geoIpLib = require('/lib/geoip');

var thymeleaf = require('/lib/xp/thymeleaf');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var view = resolve('test-ip.html');
    var model = {};

    // Run the tests.
    //model.city = geoIpLib.testMethod();

    var host = req.host;
    //geoIpLib.cityInfo(host);
    var info = geoIpLib.cityInfo('67.161.18.244');


    //model.city = JSON.stringify(info, null, 4);

    model.cityName = geoIpLib.cityName(info);
    model.countryName = geoIpLib.countryName(info);
    model.countryISO = geoIpLib.countryISO(info);
    model.cityGeoPoint = geoIpLib.cityGeoPoint(info);


    return {
        body: thymeleaf.render(view, model)
    };
}