
import axios from "axios"

export async function logOutUser() {
    return await axios.post('/logoutUser')
}