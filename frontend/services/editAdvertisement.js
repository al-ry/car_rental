import axios from 'axios'

export async function getMutableAdvertisement(advertisementId) {
    return await axios.get('/editAdvertisement', {
        params: {
            idAdvertisment: advertisementId
        },
        withCredentials: true});
}

// export async function postMutableAdvertisement(advertisementId) {
//     return await axios.post('/advertismentInfo', {
//         params: {
//             id: advertisementId
//         },
//         withCredentials: true});
// }

