const {DBManager} = require('../database/db')
const {checkPassword} = require('../utils/passwordUtil')

exports.login = async (req, res) => {
    data = req.body
    const userData = {
        phone: data.phone,
        password: data.password
    }
    try {
        db = new DBManager()
        db.connect()
        const result = await db.getPasswordByPhone(userData.phone)
        checkPassword(result.rows[0].password, userData.password)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    };
}

