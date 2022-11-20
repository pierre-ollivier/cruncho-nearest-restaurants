//import { JsonObjectExpression } from "typescript";

export default class Restaurant {
    name: string;
    rating: number;
    address: string;
    longitude: number;
    latitude: number;

    constructor(info: Object) {
        console.log("Enter constructor");
        this.name = info["name"];
        this.rating = info["rating"];
        this.address = info["vicinity"];
        this.longitude = info["geometry"]["location"]["lng"];
        this.latitude = info["geometry"]["location"]["lat"];
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