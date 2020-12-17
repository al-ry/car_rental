import axios from 'axios'

export async function bookCar(startDate, endDate, id) {
    return await axios.post('/bookCar',{ start: startDate, end: endDate, idAdvertisement: id
    , withCredentials: true});
}