import axios from 'axios'

export async function giveReview(id, userRate, desc) {
    return await axios.post('/giveReview', {idAdvertisment: id, rate: userRate,
        description: desc, withCredentials: true})
}