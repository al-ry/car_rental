const {DBManager} = require('../database/db')
const {checkPassword} = require('../utils/passwordUtil')
const {checkLogin} = require('../utils/loginUtil')

exports.login = async (req, res) => {
    data = req.body
    const userData = {
        phone: data.phone,
        password: data.password
    }
    try {
        db = new DBManager()
        db.connect()
        const result = await db.getUserDataByPhone(userData.phone)
        checkLogin(result.rows[0].phone)
        checkPassword(result.rows[0].password, userData.password)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    };
}

