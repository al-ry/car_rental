
import axios from 'axios'

export async function addCar(data) {
    return await axios.post('/addAdvertisment', data)
}