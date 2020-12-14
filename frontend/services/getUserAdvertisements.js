import axios from 'axios'

export async function getUserAdvertisement(userPhone) {
    return await axios.get('/userAdvertisments', {
        params: {
            phone: userPhone
        },
        withCredentials: true});
}