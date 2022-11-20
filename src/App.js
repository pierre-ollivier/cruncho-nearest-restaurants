import './App.css';
import { getPositionError, options } from './back/main.ts';
import './back/main.ts';
import React, { useState, useEffect } from 'react';
import ReactTableContainer from "react-table-container";
import Restaurant from "./restaurant.ts";

const API_KEY = "AIzaSyDqPP6IuL439Wik7i9T-DIDFCvsMC0pjuM";

function reducer(state, action) {

}



function App() {
	const [longitude, setLongitude] = useState(0);
	const [latitude, setLatitude] = useState(0);
	const [restaurants, setRestaurants] = useState([null, null, null, null, null, null, null, null, null, null]);

	function getPosition(success, error, options) {
		navigator.geolocation.getCurrentPosition(success, error, options);
	};

	function success0(pos) {
		var crd = pos.coords;
		setLongitude(crd.longitude);
		setLatitude(crd.latitude);
	};

	function displayRestaurant(i) {
		if (restaurants.length === 0 || restaurants[i] === null) {
			return;
		}

		else {
			let restaurant = new Restaurant(restaurants[i]);
			return (
				<tr>
					<td>{i + 1}</td>
					<td>{restaurant.name}</td>
					<td>{restaurant.rating}</td>
					<td>.</td>
				</tr>
			)
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
				<ReactTableContainer width="auto" height="500px" borderCollapse="separate" borderSpacing="10px 10px" padding="15px">
					<table>
						<colgroup>
							<col span="1" className="" />
						</colgroup>
						<thead>
							<tr>
								<th>Restaurant number</th>
								<th>Restaurant name</th>
								<th>Rating</th>
								<th>Distance</th>
							</tr>
						</thead>
						<tbody>
							{displayRestaurant(0)}
							{displayRestaurant(1)}
							{displayRestaurant(2)}
							{displayRestaurant(3)}
							{displayRestaurant(4)}
							{displayRestaurant(5)}
							{displayRestaurant(6)}
							{displayRestaurant(7)}
							{displayRestaurant(8)}
							{displayRestaurant(9)}
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
