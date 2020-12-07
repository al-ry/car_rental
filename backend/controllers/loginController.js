const { urlencoded } = require('express')
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
        await db.connect()
        const user = await db.getUserDataByPhone(userData.phone)
        const city = await db.getCityNameById(user.id_city)
        await db.close()
        checkPassword(user.password, userData.password)
        req.session.isAuth = true
        delete user.id_city
        delete user.password
        user.city = city.name
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(400).json({error: err.message})
    }
}

