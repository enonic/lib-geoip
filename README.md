# lib-geoip 

Get location data from IPv4 or IPv6 addresses

## Usage

The MaxMind **[GeoLite2 City](http://geolite.maxmind.com/download/geoip/database/GeoLite2-City.mmdb.gz)** database must be downloaded, unzipped, and saved as content in the Enonic XP installation. **Make sure to gunzip the file before saving it as content**. Read more about the free [MaxMind databases](https://dev.maxmind.com/geoip/geoip2/geolite2/).

The database is updated the first Tuesday of each month. The location data will become less accurate if the database content is not updated monthly. Make sure to get the GeoLite2 City database, binary, gzipped version, not the CSV version. 

### Gradle build script

Make sure your project's build.gradle file has Enonic's public repo as a maven repository and include this library as a dependency. 

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

The library must be included in each controller that will use geoip functions.

```javascript
    var geoip = require('/lib/enonic/geiop');
```

Next, a JSON with the location data can be retrieved with the following function: 
`geoip.getLocationData(ip, contentKey, fileName)` 

Parameter `ip` can be retrieved from the request object `var ip = req.headers['X-Forwarded-For']`

Parameter `contentKey` is the _id or the _path (starting with /) of the database content. 

Parameter `fileName` is the name of the content attachment file.

The second and third parameters can be omitted if the database content is at the root of the installation with the path `/GeoLite2-City.mmdb` and the file attachment is also named `GeoLite2-City.mmdb`.

An example of the returned JSON is provided at the bottom of this page. Any value can be retrieved directly from this object, but helper functions exist for some commonly used values.

### Examples

```javascript
    // Get the location data as JSON.
    var locationData = geoip.getLocationData(ip, contentKey, fileName);
    
    // Get the English name of the city from the locationData object.
    var cityName = geoip.cityName(locationData);
    
    // Get the name of the city from the locationData object. The second parameter is optional and 
    // defaults to 'en'. English will be used if the name does not exist in the requested language.
    var cityName = geoip.cityName(locationData, languageCode); // San Francisco
    
    // Get the name of the country from the locationData object. The second parameter is optional and 
    // defaults to 'en'. English will be used if the name does not exist in the requested language.
    var countryName = geoip.countryName(locationData, languageCode);
    
    // Get the country ISO code from the locationData object.
    var countryISO = geoip.countryISO(locationData);
    
    // Get the latitude and longitude from the locaationData object.
    var latLong = geoip.geoPoint(locationData);
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