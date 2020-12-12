import axios from 'axios'

export async function continueSession() {
    return await axios.get('/home', {withCredentials: true})
}