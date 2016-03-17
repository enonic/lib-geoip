exports.testMethod = function(text) {
    var bean = __.newBean("com.enonic.maxmind.DbReaderBenchmark");
    var text = bean.test();
    log.info('IN LIB. ' + text);
    return 'END';
    //return __.toNativeObject(bean.test('text'));
};

exports.cityInfo = function(host) {
    var bean = __.newBean("com.enonic.maxmind.DbReader");
    return __.toNativeObject(bean.cityInfo(host));
};

exports.city = function(cityObj) {
    if(cityObj && cityObj.city && cityObj.city.names) {
        return cityObj.city.names.en;
    }
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
