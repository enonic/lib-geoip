var geoLib = require('/lib/geoip');
var assert = require('/lib/xp/testing');

var sampleLocationData = {
    city: {
        names: {
            en: 'Oslo',
            no: 'Oslo'
        }
    },
    country: {
        iso_code: 'NO',
        names: {
            en: 'Norway',
            no: 'Norge'
        }
    },
    location: {
        latitude: 59.5,
        longitude: 10.75
    }
};

exports.testGetLocationDataWithoutDatabase = function () {
    assert.assertNull(geoLib.getLocationData('8.8.8.8'));
};

exports.testCityName = function () {
    assert.assertEquals('Oslo', geoLib.cityName(sampleLocationData));
    assert.assertEquals('Oslo', geoLib.cityName(sampleLocationData, 'no'));
    assert.assertNull(geoLib.cityName(null));
};

exports.testCountryName = function () {
    assert.assertEquals('Norway', geoLib.countryName(sampleLocationData));
    assert.assertEquals('Norge', geoLib.countryName(sampleLocationData, 'no'));
    assert.assertNull(geoLib.countryName(null));
};

exports.testCountryISO = function () {
    assert.assertEquals('NO', geoLib.countryISO(sampleLocationData));
    assert.assertNull(geoLib.countryISO(null));
};

exports.testGeoPoint = function () {
    assert.assertEquals('59.5,10.75', geoLib.geoPoint(sampleLocationData));
    assert.assertNull(geoLib.geoPoint(null));
};
