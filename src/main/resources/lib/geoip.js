/**
 * Functions to get location data from an IP address.
 *
 * @example
 * var geoLib = require('/lib/geoip');
 */

const dbBean = __.newBean("com.enonic.geoip.DbReader");
try {
    dbBean.init(__.nullOrValue(app.config['com.enonic.lib.geoip.database.filepath']));
} catch (e) {
    log.warning('Can not load GeoIP database' ,e);
}


/**
 * Runs a benchmark test with millions of random IP addresses. The test results are only visible in the log.
 *
 * @param {boolean} [trace] Show JSON for one in each 100,000 IP addresses tested when true.
 *
 * @returns {string} A string with the test complete message.
 */
exports.test = function (trace) {
    try {
        const bean = __.newBean("com.enonic.geoip.DbReaderBenchmark");
        bean.setDatabaseFilePath(__.nullOrValue(app.config['com.enonic.lib.geoip.database.filepath']));
        bean.setTrace(trace || false);
        return bean.test();
    } catch (e) {
        log.error('Error testing geoip. ' + e.message);
        return 'Test error. See log for results.'
    }
};

/**
 * Gets location information from the database file at $XP_HOME/config/GeoLite2-City.mmdb
 *
 * @example-ref examples/getLocationData.js
 *
 * @param {string} ip The IP address to get location data for.
 *
 * @returns {object} A JSON object with the location data for the supplied IP address.
 */
exports.getLocationData = function (ip) {
    try {
        return JSON.parse(__.toNativeObject(dbBean.getLocationDataFromFile(__.nullOrValue(ip))));
    } catch (e) {
        return null;
    }
};

/**
 * Gets the name of the city from the locationData object.
 *
 * @example-ref examples/cityName.js
 *
 * @param {object} locationData The JSON locationData object returned from getLocationData().
 * @param {string} language The language code that the city name should be returned in. Default is "en".
 *
 * @returns {string} The name of the city. If 'language' was supplied but no city name exists in that language then the English name will be returned.
 */
exports.cityName = function(locationData, language) {
    try {
        var lang = (!language || (language && !locationData.city.names[language])) ? 'en' : language;
        return locationData.city.names[lang];
    } catch (e) {}
    return null;
};

/**
 * Gets the name of the country from the locationData object.
 *
 * @example-ref examples/countryName.js
 *
 * @param {object} locationData The JSON location data object returned from getLocationData().
 * @param {string} language The language code that the country name should be returned in. Default is "en".
 *
 * @returns {string} The name of the country. If 'language' was supplied but no country name exists in that language then the English name will be returned.
 */
exports.countryName = function(locationData, language) {
    try {
        var lang = (!language || (language && !locationData.country.names[language])) ? 'en' : language;
        return locationData.country.names[lang];
    } catch (e) {}
    return null;
};

/**
 * Gets the ISO code of the country from the location data object.
 *
 * @example-ref examples/countryISO.js
 *
 * @param {object} locationData The JSON location data object returned from getLocationData().
 *
 * @returns {string} The ISO code of the country.
 */
exports.countryISO = function(locationData) {
    try {
        return locationData.country.iso_code;
    } catch (e) {}
    return null;
};

/**
 * Gets the geo-location as latitude and longitude from the location data object.
 *
 * @example-ref examples/geoPoint.js
 *
 * @param {object} locationData The JSON location data object returned from getLocationData().
 *
 * @returns {string} The latitude and longitude in the format "37.6534,-122.4231".
 */
exports.geoPoint = function(locationData) {
    try {
        return locationData.location.latitude + ',' + locationData.location.longitude;
    } catch (e) {}
    return null;
};

__.disposer(function() {
    try {
        dbBean.dispose();
    } catch (e) {
        log.debug('Can not close GeoIP database', e);
    }
});
