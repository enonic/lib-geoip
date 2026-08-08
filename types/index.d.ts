declare module "/lib/geoip" {
    export interface LocationNames {
        en?: string;

        [language: string]: string | undefined;
    }

    export interface ContinentInfo {
        code?: string;
        names?: LocationNames;
        geoname_id?: number;
    }

    export interface CountryInfo {
        iso_code?: string;
        names?: LocationNames;
        geoname_id?: number;
    }

    export interface CityInfo {
        names?: LocationNames;
        geoname_id?: number;
    }

    export interface LocationInfo {
        latitude?: number;
        longitude?: number;
        time_zone?: string;
        metro_code?: number;
        accuracy_radius?: number;
    }

    export interface PostalInfo {
        code?: string;
    }

    export interface SubdivisionInfo {
        iso_code?: string;
        names?: LocationNames;
        geoname_id?: number;
    }

    export interface LocationData {
        continent?: ContinentInfo;
        country?: CountryInfo;
        registered_country?: CountryInfo;
        city?: CityInfo;
        location?: LocationInfo;
        postal?: PostalInfo;
        subdivisions?: SubdivisionInfo[];
    }

    /**
     * Gets location information from the database file at $XP_HOME/config/GeoLite2-City.mmdb.
     *
     * @param ip The IP address to get location data for. Falls back to the request's remote address when omitted or null.
     * @returns Location data for the supplied IP, or `null` if the database is missing or the lookup fails.
     */
    export function getLocationData(ip?: string | null): LocationData | null;

    /**
     * Gets the name of the city from the locationData object.
     *
     * @param locationData The locationData object returned from `getLocationData`.
     * @param language Language code the city name should be returned in. Defaults to `"en"`.
     * @returns The name of the city, or `null` if unavailable. Falls back to English when the requested language is not present.
     */
    export function cityName(locationData: LocationData | null, language?: string): string | null;

    /**
     * Gets the name of the country from the locationData object.
     *
     * @param locationData The locationData object returned from `getLocationData`.
     * @param language Language code the country name should be returned in. Defaults to `"en"`.
     * @returns The name of the country, or `null` if unavailable. Falls back to English when the requested language is not present.
     */
    export function countryName(locationData: LocationData | null, language?: string): string | null;

    /**
     * Gets the ISO code of the country from the locationData object.
     *
     * @param locationData The locationData object returned from `getLocationData`.
     * @returns The ISO code of the country, or `null` if unavailable.
     */
    export function countryISO(locationData: LocationData | null): string | null;

    /**
     * Gets the geo-location as latitude and longitude from the locationData object.
     *
     * @param locationData The locationData object returned from `getLocationData`.
     * @returns The latitude and longitude in the format `"37.6534,-122.4231"`, or `null` if unavailable.
     */
    export function geoPoint(locationData: LocationData | null): string | null;

    /**
     * Runs a benchmark test with millions of random IP addresses. Results are only visible in the log.
     *
     * @param trace When `true`, logs JSON for one in every 100,000 IP addresses tested.
     * @returns A string with the test complete message.
     */
    export function test(trace?: boolean): string;
}

export {};
