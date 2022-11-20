//import { JsonObjectExpression } from "typescript";

export default class Restaurant {
    name: string;
    rating: number;

    constructor(name: string, rating: number) {
        console.log("Enter constructor");
        //this.name = info["name"];
        //this.rating = info["rating"];
        this.name = name;
        this.rating = rating;
    }

    getName() {
        return this.name;
    }

    getRating() {
        return this.rating;
    }
}

// export default Restaurant;