import axios from 'axios'

export async function acceptBooking(id) {
    return await axios.post('/acceptBooking', {idBooking: id, withCredentials: true})
}