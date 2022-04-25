import css from "../css/styles.css";
import { initMap } from "./mapbox_gl";

export function checkResponseStatus(response) {
    if (response.ok) {
        return response
    } else {
        let error = new Error(response.statusText)
        error.response = response
        throw error
    }
}  

initMap();