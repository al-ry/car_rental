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
    ApplyCostSortByASC(ASCSortType) {
        return (ASCSortType) ? 'ORDER BY cost ASC ' : 'ORDER BY id_advertisment DESC '
    },
    ApplyCostSortByDESC(DESCSortType) {
        return (DESCSortType) ? 'ORDER BY cost DESC ' : 'ORDER BY id_advertisment DESC '
    }
} 