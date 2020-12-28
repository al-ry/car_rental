import axios from 'axios'

export async function getMutableAdvertisement(advertisementId) {
    return await axios.get('/editAdvertisement', {
        params: {
            idAdvertisment: advertisementId
        },
        withCredentials: true});
}

export async function postMutableAdvertisement(data) {
    return await axios.post('/editAdvertisement', data, { 
        withCredentials: true});
}

