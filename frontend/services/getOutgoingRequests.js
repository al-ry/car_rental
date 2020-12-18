import axios from 'axios'

export async function getOutgoingRequests() {
    return await axios.get('/outgoingBooking', {withCredentials: true});
}