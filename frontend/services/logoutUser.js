export async function logOutUser() {
    return await axios.get('/logoutUser', {withCredentials: true})
}