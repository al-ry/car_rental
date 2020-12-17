import axios from 'axios'

export async function getIncomingRequests() {
    return await axios.get('/incomingBooking', {withCredentials: true});
}