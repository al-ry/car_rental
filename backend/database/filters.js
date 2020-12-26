module.exports = {
    ApplyTransmissionFilter(transmission) {
        return (transmission) ? 'AND transmission = ' + transmission + ' ' : ''
    },
    ApplyBodyFilter(body) {
        return (body) ? 'AND body = ' + body + ' ' : ''
    },
    ApplyCityFilter(city) {
        return (city) ? 'AND city = ' + '\'' + city + '\'' + ' ' : ''
    },
    ApplyCostFilter(cost) {
        return (cost) ? 'AND cost <= ' + '\'' + cost + '\'' + ' ' : ''
    },
    ApplyCostSort(ASCSortType, DESCSortType) {
        let res = ''
        if(ASCSortType) {
            res = 'ORDER BY cost ASC '
        } else if (DESCSortType) {
            res = 'ORDER BY cost DESC '
        } else {
            res = 'ORDER BY id_advertisment DESC '
        }
        return res
    },
    ApplyDateFilter(start, end) {
        return (start && end) ? '' : ''
    }
} 