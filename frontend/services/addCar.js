

//import Axios from "axios";

export async function addCar(data) {
    const response = await fetch('/addCar', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: data
    })
    return await response;
}