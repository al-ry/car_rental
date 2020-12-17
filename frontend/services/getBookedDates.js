import axios from 'axios'

export async function getBookedDates(idAdvertisement) {
    return await axios.get('/bookedDates', {
        params: {
            id: idAdvertisement
        },});
}