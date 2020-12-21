import axios from 'axios'

export async function reopenAdvertisement(advertisementId) {
    return await axios.post('/reopenAdvertisment', {
        id: advertisementId
    });
}