function checkSession(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.status(200).json({err: "You have no permission"})
    }
}

module.exports = {checkSession}