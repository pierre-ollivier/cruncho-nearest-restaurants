import './App.css';
import { getPositionError, options } from './back/main.ts';
import './back/main.ts';
import React, { useState, useEffect } from 'react';
import ReactTableContainer from "react-table-container";
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
	const [restaurants, setRestaurants] = useState([null, null, null, null, null, null, null, null, null, null]);
	const [strRestaurants, setStrRestaurants] = useState("");

	function getPosition(success, error, options) {
		navigator.geolocation.getCurrentPosition(success, error, options);
	};

	function success0(pos) {
		var crd = pos.coords;
		setLongitude(crd.longitude);
		setLatitude(crd.latitude);
	};

	function updateStrRestaurants() {
		console.log("Entered updateStrRestaurants")
		console.log(restaurants)
		var strR = "";
		if (restaurants.length !== 0) {
			for (let i = 0; i < 10; i++) {
				if (restaurants[i] !== null) {
					strR += restaurants[i]["name"];
				}
			}
			setStrRestaurants(strR);
		}
	}

	function getNameFromRestaurant(i) {
		if (restaurants[i] == null) {
			return "-";
		}
		else {
			return restaurants[i]["name"];
		}
	}

	getPosition(success0, getPositionError, options);

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
			.then((data) => { console.log(data); setRestaurants(data.results) });
	};

	useEffect(() => {
		getRestaurantsData();
	}, [latitude]); //As soon as `latitude` changes, run getRestaurantsData

	useEffect(() => {
		updateStrRestaurants();
	}, [restaurants]);


	return (
		<div className="App">
			<header className="App-header">
				<p>
					Hello!
				</p>
				<p>
					Your coordinates are: {latitude}, {longitude}.
				</p>
				<p>
					Here are the 10 closest restaurants from your position:
				</p>
				<ReactTableContainer width="auto" height="500px">
					<table>
						<colgroup>
							<col span="1" className="" />
						</colgroup>
						<thead>
							<tr>
								<th>Restaurant number</th>
								<th>Restaurant name</th>
								<th>Distance from your location</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>{getNameFromRestaurant(0)}</td>
								<td>.</td>
							</tr>
							<tr>
								<td>2</td>
								<td>{getNameFromRestaurant(1)}</td>
								<td>.</td>
							</tr>
							<tr>
								<td>3</td>
								<td>{getNameFromRestaurant(2)}</td>
								<td>.</td>
							</tr>
							<tr>
								<td>4</td>
								<td>{getNameFromRestaurant(3)}</td>
								<td>.</td>
							</tr>
							<tr>
								<td>5</td>
								<td>{getNameFromRestaurant(4)}</td>
								<td>.</td>
							</tr>
							<tr>
								<td>6</td>
								<td>{getNameFromRestaurant(5)}</td>
								<td>.</td>
							</tr>
							<tr>
								<td>7</td>
								<td>{getNameFromRestaurant(6)}</td>
								<td>.</td>
							</tr>
							<tr>
								<td>8</td>
								<td>{getNameFromRestaurant(7)}</td>
								<td>.</td>
							</tr>
							<tr>
								<td>9</td>
								<td>{getNameFromRestaurant(8)}</td>
								<td>.</td>
							</tr>
							<tr>
								<td>10</td>
								<td>{getNameFromRestaurant(9)}</td>
								<td>.</td>
							</tr>
						</tbody>
					</table>
				</ReactTableContainer>
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
