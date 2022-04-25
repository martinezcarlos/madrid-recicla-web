import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { fetchClothesContainers } from "./clothes-containers.js";
import { checkResponseStatus } from "./entry.js";

// Global vars //

var mapLongitude;
var mapLatitude;
var zoom = 15;
var map;

/////// functions /////
async function fetchMapboxToken() {
    var url = process.env.SERVER_URL + process.env.MAPBOX_TOKEN_PATH
    return fetch(url, {
        method: 'GET',
        cache: "default",
        mode: 'cors'
    })
        .then(checkResponseStatus)
        .then(response => response.text())
        .catch(error => console.error('error', error));
}

async function initCoordinates() {
    let madridCenterLongitude = -3.7037513986083885;
    let madridCenterLatitude = 40.416856446443205;
    mapLongitude = madridCenterLongitude;
    mapLatitude = madridCenterLatitude;

    console.info("Initializing coordinates");

    // return new Promise((resolve, reject) => {
    //     navigator.geolocation.watchPosition(
    //         position => resolve(position),
    //         error => reject(error)
    //     )
    // }).then(position => {
    //     console.info('Using user coordinates');
    //     mapLongitude = position.coords.longitude;
    //     mapLatitude = position.coords.latitude;
    // }).catch(error => {
    //     console.warn(`ERROR(${error.code}): ${error.message}`);
    //     console.info('Using default coordinates');
    //     let madridCenterLongitude = -3.7037513986083885;
    //     let madridCenterLatitude = 40.416856446443205;
    //     mapLongitude = madridCenterLongitude;
    //     mapLatitude = madridCenterLatitude;
    // });
}

async function initMapbox() {
    var mapboxAccessToken = localStorage.getItem("mapboxAccessToken");
    if (mapboxAccessToken === null) {
        mapboxAccessToken = await fetchMapboxToken();
        localStorage.setItem("mapboxAccessToken", mapboxAccessToken);
    }
    mapboxgl.accessToken = mapboxAccessToken;
    map = new mapboxgl.Map({
        container: 'map', // HTML container ID
        style: 'mapbox://styles/mapbox/streets-v9', // style URL
        center: [mapLongitude, mapLatitude], // starting position as [lng, lat]
        zoom: zoom
    });
    console.info("Initializing mapbox");
}

function addGeoLocate() {
    const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    })
    console.info("Adding geolocate");
    map.addControl(geolocate);
}

export async function initMap() {
    try {
        await initCoordinates();
        await initMapbox();
        addMarkersManually();
        addGeoLocate();
    } catch (error) {
        console.error('My error: ', error);
    }
}

async function addMarkersManually() {
    var clothesContainers = localStorage.getItem("clothesContainers");
    if (clothesContainers === null) {
        clothesContainers = await fetchClothesContainers();
        localStorage.setItem("clothesContainers", JSON.stringify(clothesContainers));
    } else {
        clothesContainers = JSON.parse(clothesContainers);
    }
    Promise.resolve(clothesContainers)
        .then(cc => {
            for (const feature of cc.features) {
                // create a HTML element for each feature
                const el = document.createElement('div');
                el.className = 'marker';
                // make a marker for each feature and add to the map
                new mapboxgl.Marker(el)
                    .setLngLat(feature.geometry.coordinates)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML(preparePopupContent(feature))
                    )
                    .addTo(map);
            }
            console.info("Adding markers manually");
        });
}

function preparePopupContent(feature) {
    return `
    <h3>${feature.properties.title}</h3
    <p>
    <table>
        <tr>
            <th>Address:</th>
            <td>${feature.properties.title}</td>
        </tr>
    </table>
    </p>`;
}