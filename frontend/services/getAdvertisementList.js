import axios from 'axios'

export async function getAdvertisementList(pageNumber, count ) {
    return await axios.get('/advertismentList', {
        params: {
            page: pageNumber,
            limit: count
        },
    });
}