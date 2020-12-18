import axios from 'axios'

export async function declineBooking(id) {
    return await axios.post('/declineBooking', {idBooking: id, withCredentials: true})
}