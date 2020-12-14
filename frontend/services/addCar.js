
import axios from 'axios'

export async function addCar(data) {
    return await axios.post('/addCar', data)
}