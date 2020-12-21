import axios from 'axios'

export async function getUserReviews(userPhone) {
    return await axios.get('/userReview', {
        params: {
            phone: userPhone 
        },
        withCredentials: true});
}