const {DBManager} = require('../database/db')

exports.login = async (req, res) => {
    data = req.body
    const userData = {
        phone: data.phone,
        passwotd: data.password
    }
    try {
        db = new DBManager()
        db.connect()
        const password = await db.getPasswordByPhone(userData.phone)
        checkPassword(password, userData.password)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    };
}

