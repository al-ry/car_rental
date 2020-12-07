exports.checkSession = async (req, res) => {
    if (req.session.isAuth) {
        console.log(req.session)
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
}