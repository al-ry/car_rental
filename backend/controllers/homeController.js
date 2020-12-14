exports.home = async (req, res) => {
    res.status(200).json(req.session.user)
}