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
        password: saltAndHash
    } 
    const db = new DBManager()
    try {
        await db.connect()
        const idCity = await db.getCityIdByName(data.cityName)
        user.idCity = idCity
        userData = await db.insertUser(user)
        await db.close()
        const userInfo = {
            id: userData.id_user,
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            city: data.cityName
        }
        req.session.user = userInfo
        res.status(200).json(userInfo)
    } catch (err) {
        console.log(err)
        if (err instanceof RegistrationError) {
            res.status(400).json({errror: err.message})
        } 
        res.status(400).json({errror: 'Unexpected error'})
    }
}