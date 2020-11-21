
// export async function addCar(data) {
//     const response = await fetch('/addCar', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//         body: JSON.stringify(data)
//     })
//     return await response;
// }

import Axios from "axios";

export async function addCar(data) {

    const response = await fetch('/addCar', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: JSON.stringify(data)
    })
    return await response;
}