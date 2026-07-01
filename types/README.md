# Types for GeoIP library

Type definitions for the [Enonic XP GeoIP library](https://github.com/enonic/lib-geoip).

## Install

```bash
npm i --save-dev @enonic-types/lib-geoip
```

Versions track the library itself, so install the same version as the `com.enonic.lib:lib-geoip` dependency in your `build.gradle`.

## Setup

Add lib-geoip to `compilerOptions.paths` in the `tsconfig.json` file used for your application's server-side TypeScript code:

```json
{
  "compilerOptions": {
    "paths": {
      "/lib/geoip": ["./node_modules/@enonic-types/lib-geoip"]
    }
  }
}
```

## Use

```ts
import {getLocationData, cityName, countryName, countryISO, geoPoint} from '/lib/geoip';

export function get(request) {
    const locationData = getLocationData(request.remoteAddress);

    return {
        body: {
            city: cityName(locationData),
            country: countryName(locationData, 'de'),
            countryCode: countryISO(locationData),
            geoPoint: geoPoint(locationData),
        },
        contentType: 'application/json',
    };
}
```

All imports from `/lib/geoip` should now be typed.

The MaxMind GeoLite2 City database must be present at `$XP_HOME/config/GeoLite2-City.mmdb` for lookups to return data.

## API

### `getLocationData(ip?: string | null): LocationData | null`

Gets location information for an IP address from the GeoLite2 City database. Falls back to the remote address of the current request when `ip` is omitted or `null`. Returns `null` if the database is missing or the lookup fails.

### `cityName(locationData: LocationData | null, language?: string): string | null`

Gets the name of the city in the given language (default `"en"`). Falls back to English when the requested language is not present.

### `countryName(locationData: LocationData | null, language?: string): string | null`

Gets the name of the country in the given language (default `"en"`). Falls back to English when the requested language is not present.

### `countryISO(locationData: LocationData | null): string | null`

Gets the ISO code of the country, e.g. `"US"`.

### `geoPoint(locationData: LocationData | null): string | null`

Gets the latitude and longitude as a single string, e.g. `"37.6534,-122.4231"`.

### `test(trace?: boolean): string`

Runs a benchmark with millions of random IP addresses. Results are only written to the server log. When `trace` is `true`, JSON is logged for one in every 100,000 addresses. The test takes several minutes and puts a heavy load on the server.

### `LocationData`

| Property             | Type                | Description                                      |
|----------------------|---------------------|--------------------------------------------------|
| `continent`          | `ContinentInfo`     | Continent `code`, `names` and `geoname_id`.      |
| `country`            | `CountryInfo`       | Country `iso_code`, `names` and `geoname_id`.    |
| `registered_country` | `CountryInfo`       | Country where the IP address is registered.      |
| `city`               | `CityInfo`          | City `names` and `geoname_id`.                   |
| `location`           | `LocationInfo`      | `latitude`, `longitude`, `time_zone`, `metro_code` and `accuracy_radius`. |
| `postal`             | `PostalInfo`        | Postal `code`.                                   |
| `subdivisions`       | `SubdivisionInfo[]` | Regions such as states, with `iso_code`, `names` and `geoname_id`. |

All properties are optional, as data may not be available for every IP address. `names` is a `LocationNames` object keyed by language code, e.g. `{en: 'California', de: 'Kalifornien'}`.

## Documentation

[GeoIP library](https://github.com/enonic/lib-geoip#readme)
