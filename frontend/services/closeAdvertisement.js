import axios from 'axios'

export async function closeAdvertisement(advertisementId) {
    return await axios.post('/closeAdvertisment', {
        id: advertisementId
    });
}