exports.checkSession = async (req, res) => {
    if (req.session.user) {
        console.log(req.session)
        res.status(200).json(req.session.user)
    } else {
        res.sendStatus(400)
    }
}