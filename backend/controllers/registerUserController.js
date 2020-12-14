const {DBManager} = require('../database/db')
const {saltHashPassword} = require('../utils/passwordUtil')

exports.registerUser = async (req, res) => {
    let data = req.body
    const hashPass = saltHashPassword(data.password)
    const saltAndHash = hashPass.salt + hashPass.passwordHash
    let user = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        idCity: data.id_city,
        password: saltAndHash
    } 
    db = new DBManager()
    try {
        await db.connect()
        await db.findByEmail(user.email)
        await db.findByPhone(user.phone)
        userId = await db.insertUser(user)
        const userData = await db.getUserDataByPhone(user.phone)
        const city = await db.getCityNameById(userData.id_city)
        await db.close()
        const userInfo = {
            id: userId,
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            city: city.name
        }
        req.session.user = userInfo
        res.status(200).json(userInfo)
    } catch (err) {
        console.log(err)
        res.status(400).json({errror: err.message})
    }
}