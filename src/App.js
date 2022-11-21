import './App.css';
import React, { useState, useEffect } from 'react';
import ReactTableContainer from "react-table-container";
import Restaurant from "./restaurant.ts";
import sortRestaurants from './utils.js';
import Map from "./map";

const API_KEY = "AIzaSyDqPP6IuL439Wik7i9T-DIDFCvsMC0pjuM";

const PRICE_INDEX_TO_STR = {
	0: "Very cheap",
	1: "Cheap",
	2: "Average",
	3: "Expensive",
	4: "Very expensive",
	100: "?",
}

function App() {
	const [longitude, setLongitude] = useState(0);
	const [latitude, setLatitude] = useState(20);
	const [restaurants, setRestaurants] = useState([null, null, null, null, null, null, null, null, null, null]);
	const [restaurantsGathered, setRestaurantsGathered] = useState(false);

	function getPosition(success, error, getPositionOptions) {
		navigator.geolocation.getCurrentPosition(success, error, getPositionOptions);
	};

	function getPositionSuccess(pos) {
		var crd = pos.coords;
		setLongitude(crd.longitude);
		setLatitude(crd.latitude);
	};

	function getPositionError(err) {
		console.warn(`ERROR (${err.code}): ${err.message}`);
	}

	var getPositionOptions = {
		enableHighAccuracy: true,
		timeout: 10000, // If no answer within 4 seconds, consider that the geolocalisation failed
		maximumAge: 300000 // maximum duration during which the position is stored in cache
	};

	function displayRestaurant(i) {
		/**
		 * Displays the restaurant (ranked `i` in `restaurants`) in the ReactTableContainer.
		 */
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

	function rearrangeRestaurants(restaurants) {
		/**
		 * Returns a list featuring the order of the restaurant when they are sorted by distance.
		 * Exemple: if the distances are [200, 300, 100, 400, 600, 550], the output will be [2, 3, 1, 4, 6, 5].
		 */
		let distances = [];
		let orderedRestaurants = [];
		for (let i = 0; i < restaurants.length; i++) {
			let restaurant = new Restaurant(restaurants[i]);
			let distance = restaurant.distanceToSphericalCoords(latitude, longitude);
			distances.push(distance);
		}
		let ranksByDistances = sortRestaurants(distances);
		for (let i = 0; i < restaurants.length; i++) {
			orderedRestaurants.push(restaurants[ranksByDistances[i]]);
		}
		return orderedRestaurants;
	}

	function displayRestaurants() {
		/**
		 * Successively displays the restaurant in the ReactTableContainer.
		 */
		if (restaurants.length === 0) {
			return;
		}

		else {
			return (
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
			)
		}
	}

	function addMap(draw) {
		/**
		 * Displays the map, if and only if restaurants have been found.
		 */
		if (draw) {
			return <Map latitude={latitude} longitude={longitude} restaurants={restaurants} display={true} />
		}
		else {
			return <p></p>
		}
	}

	function drawReactTableContainer(draw) {
		if (draw) {
			return (
				<ReactTableContainer width="auto" height="600px" borderCollapse="separate" borderSpacing="10px 10px" padding="15px">
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
			)
		}
		else {
			return <p></p>
		}
	}



	function topMessage() {
		/**
		 * Displays the status message: either acquiring localization/nearby restaurants, or presenting the table.
		 */
		if (longitude === 0 && latitude === 0) {
			return (
				<p>
					Hello!
					Acquiring your localization...
				</p>
			)
		}
		else if (!restaurantsGathered) {
			return (
				<p>
					Hello!
					Crunching restaurant data...
				</p>
			)
		}
		else {
			return (
				<p>
					Hello! Here are the 10 closest restaurants from your position:
				</p>
			)
		}
	}

	var getRestaurantsData = async () => {
		/**
		 * Links a request to the update of the `restaurants` list.
		 */
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
			}
		};
		return fetch(`https://whispering-caverns-88652.herokuapp.com/` + `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&type=restaurant&rank-by=distance&key=${API_KEY}`, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.status === "OK") {
					setRestaurants(rearrangeRestaurants(data.results));
					setRestaurantsGathered(true);
				}
				else {
					getRestaurantsData();
				}
			});
	};

	getPosition(getPositionSuccess, getPositionError, getPositionOptions);

	useEffect(() => {
		getRestaurantsData();
	}, [latitude]); //As soon as `latitude` changes, run getRestaurantsData


	return (
		<div className="App">
			<header className="App-header">
				{topMessage()}
				<div class="row">
					<div class="column left">
						{drawReactTableContainer(restaurantsGathered)}
					</div>
					<div class="column right">
						{addMap(restaurantsGathered)}
					</div>
				</div>


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
