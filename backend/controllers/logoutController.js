const session = require("express-session")

exports.logout = (req, res) => {
    req.session.destroy((err) =>{
        if (err) {
            res.status(400).json({err: "Unexpected error"})
        }
        res.sendStatus(200)
    })
}