//import { JsonObjectExpression } from "typescript";

export default class Restaurant {
    name: string;
    rating: number;
    address: string;
    longitude: number;
    latitude: number;
    price: number;

    constructor(info: Object) {
        if (info !== null && info !== undefined) {
            if ("name" in info) this.name = info["name"];
            if ("rating" in info) this.rating = info["rating"];
            if ("vicinity" in info) this.address = info["vicinity"];
            if ("geometry" in info) {
                this.longitude = info["geometry"]["location"]["lng"];
                this.latitude = info["geometry"]["location"]["lat"];
            }
            if ("price_level" in info) {
                this.price = info["price_level"];
            }
            else {
                this.price = 100; // Corresponds to `unknown`
            }
        }
    }

    distanceToSphericalCoords(lat: number, lon: number) {
        let dLambda = lon - this.longitude;
        let earthRadius = 6378137; //meters
        return earthRadius * Math.acos(sinD(lat) * sinD(this.latitude) + cosD(lat) * cosD(this.latitude) * cosD(dLambda));
    }
}

function sinD(angle: number) {
    /**
     * Returns the sine of `angle` when `angle` is exprimed in degrees.
     */
    return Math.sin(angle * Math.PI / 180);
}
function cosD(angle: number) {
    /**
     * Returns the cosine of `angle` when `angle` is exprimed in degrees.
     */
    return Math.cos(angle * Math.PI / 180);
}
