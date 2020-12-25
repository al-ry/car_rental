const acceptBookingRouter = require("../routes/acceptBooking")

function paginateAdvertismentList(req, res, next) {
    page = parseInt(req.query.page)
    limit = parseInt(req.query.limit)

    startPos = (page - 1) * limit
    endPos = limit * page

    results = {}

    results.current = {
        startPos: startPos,
        endPos: endPos,
        page: page,
        limit: limit
    }

    results.next = {
        page : page + 1,
        limit : limit
    }

    if (startPos > 0) {
        results.prev = {
            page: page - 1,
            limit: limit
        }
    }

    req.results = results
    next()
}

module.exports = {paginateAdvertismentList}