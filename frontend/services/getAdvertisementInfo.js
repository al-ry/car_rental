import axios from 'axios'

export async function getAdvertismentInfo(advertisementId) {
    return await axios.get('/advertismentInfo', {
        params: {
            id: advertisementId
        },
    });
}