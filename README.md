# lib-geoip 

Get location data from IPV4 or IPV6 addresses

## Usage

The GeoLite2 City database must be downloaded from https://dev.maxmind.com/geoip/geoip2/geolite2/ and saved as content in the Enonic XP installation. Get the MaxMind DB binary gzipped version, not the CSV version. **Make sure to gunzip it before saving it as content**. 

The database is updated the first Tuesday of each month. The location data will become less accurate if the database content is not updated frequently.

### Gradle build script

```javascript
    repositories {
        maven {
            url 'http://repo.enonic.net/public'
        }
    }

    dependencies {
        include 'com.enonic.lib:geoip:1.0.0'
    }
```

### Using the library in controllers

First the library must be included.

```javascript
    var libs = {
        geoip: require('/lib/enonic/geiop');
    }
```

Next, a JSON with the location data can be retrieved with the following function: 
`libs.geoip.getLocationData(ip, contentKey, fileName)` 

Parameter `ip` can be retrieved from the request object `var ip = req.headers['X-Forwarded-For']`

Parameter `contentKey` is the _id or _path (starting with /) of the database content. 

Parameter `fileName` is the name of the content attachment file.

The second and third parameters can be omitted if the database content is at the root of the installation with the path `/GeoLite2-City.mmdb` and the file attachment is also named `GeoLite2-City.mmdb`.

An example of the returned JSON is provided at the bottom of this page. Any value can be retrieved directly from this object, but some commonly used values can be retrieved with helper functions.

### Examples

```javascript
    // Get the location data as JSON.
    var locationData = libs.geoip.getLocationData(ip, contentKey, fileName);
    
    // Get the English name of the city from the locationData object.
    var cityName = libs.geoip.cityName(locationData);
    
    // Get the Russian name of the city from the locationData object.
    // If the Russion name does not exist, the English name will be returned.
    var cityName = libs.geoip.cityName(locationData, 'ru');
    
    // Get the name of the country from the locationData object.
    // A language code can be added as a second parameter and will fallback to English
    var countryName = libs.geoip.countryName(locationData);
    
    // Get the country ISO code from the locationData object.
    var countryISO = libs.geoip.countryISO(locationData);
    
    // Get the latitude and longitude from the locaationData object.
    var latLong = libs.geoip.cityGeoPoint(locationData);
```    

## Compatibility

| Lib version   | XP version |
| ------------- | ---------- |
| 1.0.0         | 6.4.2      |

## Example location data

```javascript
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
```