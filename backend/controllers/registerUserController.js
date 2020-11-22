const {DBManager} = require('../database/db')
const passwordUtil = require('../utils/passwordUtil')

exports.registerUser = async (req, res) => {
    let data = req.body
    console.log(data)
    const hashPass = passwordUtil.saltHashPassword(data.password)
    const saltAndHash = hashPass.salt + hashPass.passwordHash
    let user = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        idCity: data.id_city,
        password: saltAndHash
    }
    try {
        db = new DBManager()
        await db.connect()
        await db.insertUser(user)
        await db.close()
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}