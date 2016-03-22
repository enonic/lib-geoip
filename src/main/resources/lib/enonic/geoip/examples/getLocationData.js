var geoLib = require('/lib/enonic/geoip');

// BEGIN
// Gets the location info by IP from the GeoLite2 City database content.
var result = geoLib.getLocationData('67.161.18.244', '/GeoLite2-City.mmdb', 'GeoLite2-City.mmdb');

if (result) {
    log.info(JSON.stringify(result, null, 4));
} else {
    log.info('No location data for that IP');
}
// END

//BEGIN
// Location info as JSON
var expected = {
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
}
// END