const API_KEY = "AIzaSyDqPP6IuL439Wik7i9T-DIDFCvsMC0pjuM";
const latitude = 48.89;
const longitude = 2.33;

console.log("File main.js is reached.");

export function getAPIResults() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
        }
    };
    console.log(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${API_KEY}`)
    return fetch(`https://whispering-caverns-88652.herokuapp.com/` + `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${API_KEY}`, requestOptions)
        .then((response) => response.json())
        .then((data) => { console.log(data); });
};

export function getPositionSuccess(pos: GeolocationPosition) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude: ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`The accuracy is ${crd.accuracy} meters.`);
}

export function getPositionError(err: GeolocationPositionError) {
    console.warn(`ERROR (${err.code}): ${err.message}`);
}

export var options = {
    enableHighAccuracy: true,
    timeout: 10000, // If no answer within 10 seconds, consider that the geolocalisation failed
    maximumAge: 300000 // maximum duration during which the position is stored in cache
};

export function getPosition(success: (pos: GeolocationPosition) => void, error: (err: GeolocationPositionError) => void, options: PositionOptions | undefined) {
    navigator.geolocation.getCurrentPosition(success, error, options);
}