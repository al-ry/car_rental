import axios from 'axios'

export async function getAdvertisementList(pageNumber, count, filters) {

    if (filters && filters.dateRange) {
        var filtersCopy = JSON.parse(JSON.stringify(filters));
        filtersCopy.dateRange = JSON.stringify(filtersCopy.dateRange)
    }

    console.log(count, pageNumber, filtersCopy)
    return await axios.get('/advertismentList', {
        params: {
            page: pageNumber,
            limit: count,
            filters: filtersCopy
        },
    });
}