var geoIpLib = require('/lib/geoip/geoip.js');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    //var view = resolve('article-list.html'); // The view to render
    var model = {};


    //log.info(geoIpLib.testMethod());

    var host = req.host;

    //log.info(JSON.stringify(req,null,4));

    //geoIpLib.cityInfo(host);
    var info;

    try {

        info = geoIpLib.cityInfo('67.161.18.244');
        //info = geoIpLib.cityInfo(host);
        var test = JSON.parse(info);

        log.info('Logging the JSON.parse');
        log.info(JSON.stringify(test, null, 4));
    } catch (e) {
        log.error(e);
    }


    return {
        body: '<div>GeioIP</div>'
    };
}