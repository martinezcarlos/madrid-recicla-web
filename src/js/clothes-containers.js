import { checkResponseStatus } from "./entry.js";

export async function fetchClothesContainers() {
    // Fetch containers from server
    var url = process.env.SERVER_URL + process.env.CLOTHES_CONTAINERS_PATH
    return fetch(url, {
        method: 'GET', 
        headers: new Headers({
            'Accept': 'application/geojson',
        }),
        cache: "default",
        mode: 'cors'
    })
    .then(checkResponseStatus)
    .then(response => response.json())
    .catch(error => console.error('error', error));
}