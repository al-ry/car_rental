
import axios from 'axios'

export async function addCar(data) {
    const response = await axios.post('/addCar', data)

    return await response;
}