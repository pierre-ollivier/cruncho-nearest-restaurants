import './App.css';
import { getPosition, getPositionError, options } from './back/main.ts';
import './back/main.ts';
import { getAPIResults } from './back/main.ts';
import React, { useState, useEffect } from 'react';
/*
var latitude = 0.;
var longitude = 0.;
*/
const API_KEY = "AIzaSyDqPP6IuL439Wik7i9T-DIDFCvsMC0pjuM";

const initialState = {
	lat: 0,
	lon: 0,
}

function reducer(state, action) {

}



function App() {
	const [longitude, setLongitude] = useState(0);
	const [latitude, setLatitude] = useState(0);


	function getPosition(success, error, options) {
		navigator.geolocation.getCurrentPosition(success, error, options);
	};

	function success0(pos) {
		var crd = pos.coords;
		setLongitude(crd.longitude);
		setLatitude(crd.latitude);
	};

	getPosition(success0, getPositionError, options);
	getAPIResults();
	var getRestaurantsData = async () => {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
			}
		};
		return fetch(`https://whispering-caverns-88652.herokuapp.com/` + `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=restaurant&key=${API_KEY}`, requestOptions)
			.then((response) => response.json())
			.then((data) => { console.log(data); });
	};

	useEffect(() => {
		getRestaurantsData();
	}, [longitude]); //As soon as `longitude` changes, run getRestaurantsData


	return (
		<div className="App">
			<header className="App-header">
				<p>
					Hello World!
				</p>
				<button onClick={() => setLongitude(3)}>
					Start the research
				</button>
				<p>
					Your coordinates are: {latitude}, {longitude}.
				</p>
			</header>
		</div>
	);
}

/*
function getPositionSuccess(pos) {
	var crd = pos.coords;
	console.log('Your current position is:');
	console.log(`Latitude: ${crd.latitude}`);
	console.log(`Longitude: ${crd.longitude}`);
	console.log(`The accuracy is ${crd.accuracy} meters.`);

	latitude = crd.latitude;
	longitude = crd.longitude;
}*/



export default App;
