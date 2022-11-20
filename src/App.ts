import './App.css';
import { getPosition, getPositionError, getPositionSuccess, options } from './back/main.ts';
import './back/main.ts';
import { getAPIResults } from './back/main.ts';

function App() {
    getAPIResults();
    console.log(getAPIResults());
    getPosition(getPositionSuccess, getPositionError, options);
    return (
        <div className= "App" >
            <header className="App-header" >
                <p>
                    Hello World!
                < /p>
            < /header>
        < /div>
	);
}

function getPositionSuccess(pos: GeolocationPosition) {
    var crd = pos.coords;
    console.log('Your current position is:');
    console.log(`Latitude: ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`The accuracy is ${crd.accuracy} meters.`);
    /*
    latitude = crd.latitude;
    longitude = crd.longitude;*/
}

export default App;
