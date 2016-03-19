var contentLib = require('/lib/xp/content');

exports.testMethod = function() {
    var bean = __.newBean("com.enonic.maxmind.DbReaderBenchmark");
    var text = bean.test();

    return 'Test complete. See log for results.';
    //return __.toNativeObject(bean.test('text'));
};

exports.cityInfo = function(host) {
    var bean = __.newBean("com.enonic.maxmind.DbReader");
    var cityInfo, cityObj;
    try {
        cityInfo = __.toNativeObject(bean.cityInfo(host));
        cityObj = JSON.parse(cityInfo);
    } catch (e) {
        return null;
    }

    return cityObj;
};

exports.cityName = function(cityObj) {
    if(cityObj && cityObj.city && cityObj.city.names) {
        return cityObj.city.names.en;
    }
    return null;
}

exports.countryName = function(cityObj) {
    if(cityObj && cityObj.country && cityObj.country.names) {
        return cityObj.country.names.en;
    }
    return null;
}

exports.countryISO = function(cityObj) {
    if(cityObj && cityObj.country && cityObj.country) {
        return cityObj.country.iso_code;
    }
    return null;
}

exports.cityGeoPoint = function(cityObj) {
    if(cityObj && cityObj.location && cityObj.location.latitude && cityObj.location.longitude) {
        return cityObj.location.latitude + ',' + cityObj.location.longitude;
    }
    return null;
}

exports.getCityFromContent = function(ip) {
    var dbReader = __.newBean("com.enonic.maxmind.DbReadContent");
    dbReader.dbName = "/GeoLite2-City.mmdb";

    var dbContentStream = contentLib.getAttachmentStream({key: "1ce82bf8-9e01-4056-b068-f51c859ec109", name: "GeoLite2-City.mmdb"});
    dbReader.is = dbContentStream;

    return dbReader.cityInfo(ip);

    //dbReader.file = dbContentStream; //TODO: Return the file

    //var contentPathBean = __.newBean("com.enonic.xp.content.ContentPath");
    //var contentPath = dbReader.getFilePath( );
    //return contentPath;
}

/*
{
    "continent": {
        "code": "NA",
        "names": {
            "de": "Nordamerika",
            "ru": "Северная Америка",
            "pt-BR": "América do Norte",
            "ja": "北アメリカ",
            "en": "North America",
            "fr": "Amérique du Nord",
            "zh-CN": "北美洲",
            "es": "Norteamérica"
        },
        "geoname_id": 6255149
    },
    "country": {
        "names": {
            "de": "USA",
            "ru": "США",
            "pt-BR": "Estados Unidos",
            "ja": "アメリカ合衆国",
            "en": "United States",
            "fr": "États-Unis",
            "zh-CN": "美国",
            "es": "Estados Unidos"
        },
        "iso_code": "US",
        "geoname_id": 6252001
    },
    "city": {
        "geoname_id": 5397765,
        "names": {
            "en": "South San Francisco",
            "zh-CN": "南旧金山",
            "ja": "サウスサンフランシスコ"
        }
    },
    "location": {
        "metro_code": 807,
        "time_zone": "America/Los_Angeles",
        "latitude": 37.6534,
        "longitude": -122.4231
    },
    "postal": {
        "code": "94080"
    },
    "registered_country": {
        "names": {
            "de": "USA",
            "ru": "США",
            "pt-BR": "Estados Unidos",
            "ja": "アメリカ合衆国",
            "en": "United States",
            "fr": "États-Unis",
            "zh-CN": "美国",
            "es": "Estados Unidos"
        },
        "iso_code": "US",
        "geoname_id": 6252001
    },
    "subdivisions": [
        {
            "names": {
                "de": "Kalifornien",
                "ru": "Калифорния",
                "pt-BR": "Califórnia",
                "ja": "カリフォルニア州",
                "en": "California",
                "fr": "Californie",
                "zh-CN": "加利福尼亚州",
                "es": "California"
            },
            "iso_code": "CA",
            "geoname_id": 5332921
        }
    ]
}
*/
