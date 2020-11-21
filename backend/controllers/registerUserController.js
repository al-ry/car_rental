const {DBManager} = require('../database/db')
const passwordUtil = require('../utils/passwordUtil')

exports.registerUser = (req, res) => {
    const data  = req.body
    console.log(user)
    var hashPass = passwordUtil.SaltHashPassword(user.password)
    try {
        db = new DBManager()
        db.connect()
        db.insertUser()
        db.close()
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(400)
    }

}