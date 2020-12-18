const {DBManager} = require('../database/db')
const { AuthorizationError } = require('../errors/authorizationErrors')
const {checkPassword} = require('../utils/passwordUtil')

exports.login = async (req, res) => {
    data = req.body
    const userData = {
        phone: data.phone,
        password: data.password
    }
    db = new DBManager()
    try {
        await db.connect()
        const user = await db.getUserDataByPhone(userData.phone)
        const cityName = await db.getCityNameById(user.id_city)
        await db.close()
        checkPassword(user.password, userData.password)
        const userInfo = {
            id: user.id_user,
            name: user.name,
            phone: user.phone,
            email: user.email,
            city: cityName
        }
        req.session.user = userInfo
        delete userInfo.id
        res.status(200).json(userInfo)
    } catch (err) {
        if (err instanceof AuthorizationError) {
            res.status(400).json({err: err.message})
        }
        res.status(400).json({err: "Unexpected Error"})
    }
}

