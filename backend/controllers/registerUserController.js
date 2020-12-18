const {DBManager} = require('../database/db')
const { RegistrationError } = require('../errors/authorizationErrors')
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
        userData = await db.insertUser(user)
        console.log(userData)
        req.session.user = userData
        const cityName = await db.getCityNameById(userData.id_city)
        await db.close()
        const userInfo = {
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            city: cityName
        }
        res.status(200).json(userInfo)
    } catch (err) {
        if (err instanceof RegistrationError) {
            res.status(400).json({errror: err.message})
        } 
        res.status(400).json({errror: 'Unexpected error'})
    }
}