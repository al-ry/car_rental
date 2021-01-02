import axios from 'axios'

export async function getPopularMarks(maxCount) {
    return await axios.get('/popularMarks', {limit : maxCount});
}