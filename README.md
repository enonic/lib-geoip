# lib-geoip 

Get location data from IPv4 and IPv6 addresses. This information includes city name, region, country, continent, ISO codes, timezone, latitude and longitude and more. See the example below. Some data may not be available for all IP addresses.

## Usage

The MaxMind **[GeoLite2 City](http://geolite.maxmind.com/download/geoip/database/GeoLite2-City.mmdb.gz)** database must be uploaded to the `$XP_HOME/config` folder of the Enonic XP installation. This file must be named `GeoLite2-City.mmdb`. 
**Make sure to gunzip the file**. Read more about the free [MaxMind databases](https://dev.maxmind.com/geoip/geoip2/geolite2/).

The location data will become less accurate over time if your database file is not updated frequently. MaxMind releases a new version of their database on the first Tuesday of each month. 
Make sure to get the binary, gzipped version of the GeoLite2 City database, not the CSV version. 

Starting from version 2.1.0 you can customize a location of the database file. In order to do that you should add the config `com.enonic.lib.geoip.database.filepath` option into the app config file, as in the example below:

.com.enonic.app.appname.cfg
```properties
com.enonic.lib.geoip.database.filepath=/path/to/database.mmdb
```

### Gradle build script

Your project's build.gradle file must have Enonic's public repo as a maven repository. This geoip library must also be added as a dependency. 

```javascript
    repositories {
        maven {
            url 'http://repo.enonic.net/public'
        }
    }

    dependencies {
        include 'com.enonic.lib:lib-geoip:2.0.0'
    }
```

### Using the library in controllers

The library must be included in each controller that will use GeoIP functions.

```javascript
    var geoip = require('/lib/geoip');
```

Next, a JSON object with the location data for a given IP can be retrieved with the following function: 
`geoip.getLocationData(ip)` 

The `ip` parameter is the IP address that location data will be retrieved for. The remoteAddress of the request will be used if this parameter is null.

An example of the location data object is at the bottom of this page. Helper functions exist to more easily retrieve some of the commonly used values. See the examples below.

### Examples

```javascript
    // Include the GeoIP library
    var geoip = require('/lib/geoip');
    
    // Get the location data as JSON for a given IP.
    var locationData = geoip.getLocationData(ip);
    
    // Get the location data as JSON for the user's IP.
    var locationData = geoip.getLocationData(); 
    
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

### Test function

There is a test function that will run through millions of random IP addresses. The results of the test are only available in the server log. Run the test 
with `geoip.test(trace)`. The `trace` parameter is an optional boolean flag that will provide more detailed results in the log. Note that the test function
takes several minutes to run and puts a heavy load on the server.

## Compatibility

| Lib version | XP version |
|-------------| ---------- |
| 2.1.0       | 7.0.0      |
| 2.0.0       | 7.0.0      |
| 1.0.1       | 6.5.1      |

### Changelog

#### 2.0.0

* Updating lib to be xp 7.0 compatible.

#### 1.0.1

* Removed unused libraries from the Gradle build file.

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