//import { JsonObjectExpression } from "typescript";

export default class Restaurant {
    name: string;
    rating: number;
    address: string;
    longitude: number;
    latitude: number;
    price: number;

    constructor(info: Object) {
        console.log("Enter constructor");
        if (info !== null && info !== undefined) {
            console.log("info")
            console.log(info)
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
        }
    }

    distanceToSphericalCoords(lat: number, lon: number) {
        let dLambda = lon - this.longitude;
        let earthRadius = 6378137; //meters
        return earthRadius * Math.acos(sinD(lat) * sinD(this.latitude) + cosD(lat) * cosD(this.latitude) * cosD(dLambda));
    }
}

function sinD(angle: number) {
    return Math.sin(angle * Math.PI / 180);
}
function cosD(angle: number) {
    return Math.cos(angle * Math.PI / 180);
}

// export default Restaurant;