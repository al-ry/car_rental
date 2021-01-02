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
    ApplyMarkFilter(mark) {
        return (mark) ? 'AND mark = ' + '\'' + mark + '\'' + ' ' : ''
    },
    ApplyCostSort(ASCSortType, DESCSortType) {
        let res = ''
        if (ASCSortType) {
            res = 'ORDER BY cost ASC '
        } else if (DESCSortType) {
            res = 'ORDER BY cost DESC '
        } else {
            res = 'ORDER BY advertisment.id_advertisment DESC '
        }
        return res
    },
    ApplyDateFilter(dateRange) {
        var range = []
        if (dateRange) {
            range = JSON.parse(dateRange)
            if (range.length == 0) {
                return ''
            }
        } else {
            return ''
        }
        start = '\'' + range[0] + '\''; end = '\'' + range[1] + '\''
        let queryPart  = `
        INNER JOIN
        (
            SELECT id_advertisment FROM advertisment
            WHERE id_advertisment NOT IN
            (
                SELECT id_advertisment FROM booking
                WHERE state = 1 AND
                (
                ((start <= ${start} AND "end" >= ${start}) OR (start <= ${end}  AND "end" >= ${end})) OR
                (((start >= ${start}) AND ("end" <= ${end})))
                )
            )
        ) AS booking ON booking.id_advertisment = advertisment.id_advertisment
        `
        return (dateRange) ? queryPart : ''
    }
} 

//function parseArray()