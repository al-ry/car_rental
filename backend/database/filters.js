module.exports = {
    ApplyTransmissionFilter(transmission) {
        return (transmission) ? 'AND transmission = ' + transmission + ' ' : ''
    },
    ApplyBodyFilter(body) {
        return (body) ? 'AND body = ' + body + ' ' : ''
    },
    ApplyCityFilter(city) {
        return (city) ? 'AND city = ' + '\'' +  city + '\'' + ' ' : ''
    },
    ApplyCostFilter(cost) {
        return (cost) ? 'AND cost <= ' + '\'' + cost + '\'' + ' ' : ''
    }
} 