import * as React from "react";
import { useGoogleMaps } from "react-hook-google-maps";
import Restaurant from "./restaurant.ts";

const API_KEY = "AIzaSyDqPP6IuL439Wik7i9T-DIDFCvsMC0pjuM";

const Map = ({ latitude, longitude, restaurants, display }) => {
    console.log("Coordinates received: ", latitude, longitude)
    const { ref, map, google } = useGoogleMaps(
        API_KEY,
        {
            center: {
                lat: latitude,
                lng: longitude
            },
            zoom: 12,
        },
    );

    let mapHeight = 400;
    if (document.getElementById("map")) {
        mapHeight = document.getElementById('map').clientHeight
    }
    if (map) {
        // The following instructions only execute when the map is ready to display
        const mapsInfoWindow = new google.maps.InfoWindow();
        if (display) {
            for (var i = 0; i < Math.min(10, restaurants.length); i++) {
                if (restaurants[i] !== null && restaurants[i] !== undefined) {
                    let restaurant = new Restaurant(restaurants[i]);
                    const marker = new google.maps.Marker({
                        position: {
                            lat: restaurant.latitude,
                            lng: restaurant.longitude
                        },
                        title: restaurant.name,
                        map
                    });

                    marker.addListener("click", () => {
                        mapsInfoWindow.close();
                        mapsInfoWindow.setContent(marker.getTitle());
                        mapsInfoWindow.open(marker.getMap(), marker);
                    });
                }
            }
        }
    }

    return <div id="map" ref={ref} style={{ width: "100%", height: mapHeight }} />;
};

export default Map;
