import './App.css';
import { getPositionError, options } from './back/main.ts';
import './back/main.ts';
import React, { useState, useEffect } from 'react';
import ReactTableContainer from "react-table-container";
import Restaurant from "./restaurant.ts";
import sortRestaurants from './utils.js';
//import * as utils from './utils.js';

const API_KEY = "AIzaSyDqPP6IuL439Wik7i9T-DIDFCvsMC0pjuM";

function reducer(state, action) {

}

const PRICE_INDEX_TO_STR = {
	1: "Cheap",
	2: "Average",
	3: "Expensive",
	4: "Very expensive"
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
			let distance = restaurant.distanceToSphericalCoords(latitude, longitude);
			return (
				<tr>
					<td>{restaurant.name}</td>
					<td>{restaurant.address}</td>
					<td>{displayDistanceInKilometers(distance)[0]}.{displayDistanceInKilometers(distance)[1]} km</td>
					<td>{restaurant.rating}</td>
					<td>{PRICE_INDEX_TO_STR[restaurant.price]}</td>
				</tr>
			)
		}
	}

	function displayRestaurants() {
		if (restaurants.length === 0) {
			return;
		}

		else {
			let distances = [];
			for (let i = 0; i < 20; i++) {
				let restaurant = new Restaurant(restaurants[i]);
				let distance = restaurant.distanceToSphericalCoords(latitude, longitude);
				distances.push(distance);
			}
			let ranksByDistances = sortRestaurants(distances);
			return (
				<tbody>
					{displayRestaurant(ranksByDistances[0])}
					{displayRestaurant(ranksByDistances[1])}
					{displayRestaurant(ranksByDistances[2])}
					{displayRestaurant(ranksByDistances[3])}
					{displayRestaurant(ranksByDistances[4])}
					{displayRestaurant(ranksByDistances[5])}
					{displayRestaurant(ranksByDistances[6])}
					{displayRestaurant(ranksByDistances[7])}
					{displayRestaurant(ranksByDistances[8])}
					{displayRestaurant(ranksByDistances[9])}
				</tbody>
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
					Hello! Here are the 10 closest restaurants from your position:
				</p>
				<ReactTableContainer width="auto" height="500px" borderCollapse="separate" borderSpacing="10px 10px" padding="15px">
					<table>
						<colgroup>
							<col span="1" className="" />
						</colgroup>
						<thead>
							<tr>
								<th>Restaurant name</th>
								<th>Address</th>
								<th>Distance</th>
								<th>Rating</th>
								<th>Price</th>
							</tr>
						</thead>
						{displayRestaurants()}
					</table>
				</ReactTableContainer>
			</header>
		</div>
	);
}

function displayDistanceInKilometers(distance) {
	// If the distance is 2 kilometers or less, keep a 0.1 km precision
	if (distance <= 2000) {
		return [Math.floor(Math.round(distance / 100) / 10), Math.round(distance / 100) % 10];
	}
	// If the distance is 9.5 kilometers or less, keep a 0.5 km precision
	if (distance <= 9500) {
		distance = (distance + 250) - (distance + 250) % 500;
		return [Math.floor(Math.round(distance / 100) / 10), Math.round(distance / 100) % 10];
	}
	// Otherwise, keep a 1 km precision
	return [Math.round(distance / 1000), 0];
}

export default App;
