const session = require("express-session")

exports.logout = (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) =>{
            res.sendStatus(200)
        })
    } else {
        res.sendStatus(400)
    }
}