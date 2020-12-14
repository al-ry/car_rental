import axios from 'axios'

export async function getCities() {
    return await axios.get('/allCities');
}