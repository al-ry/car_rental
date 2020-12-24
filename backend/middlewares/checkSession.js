function checkSession(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.sendStatus(403)
    }
}

module.exports = {checkSession}