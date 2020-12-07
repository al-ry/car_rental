const {DBManager} = require('../database/db')
const {saltHashPassword} = require('../utils/passwordUtil')

exports.registerUser = async (req, res) => {
    let data = req.body
    const hashPass = saltHashPassword(data.password)
    const saltAndHash = hashPass.salt + hashPass.passwordHash
    console.log(data)
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
        await db.findByEmail(user.email)
        await db.findByPhone(user.phone)
        await db.insertUser(user)
        await db.close()
        req.session.isAuth = true
        res.sendStatus(200)
    } catch (err) {
        res.status(400).json({errror: err.message})
    }
}