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
    .then(checkStatus)
    .then(response => response.json())
    .catch(error => console.error('error', error));
}

function checkStatus(response) {
    if (response.ok) {
        return response
    } else {
        let error = new Error(response.statusText)
        error.response = response
        throw error
    }
}  